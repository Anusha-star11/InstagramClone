import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    UserProfileData: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({status: apiStatusConstants.progress})

    const {match} = this.props
    const {params} = match
    const {userId} = params

    const url = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updated = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        userName: data.user_details.user_name,
        userBio: data.user_details.user_bio,
        posts: data.user_details.posts,
        stories: data.user_details.stories,
      }

      this.setState({profileData: updated, status: apiStatusConstants.success})
    }

    if (response.status === 401) {
      this.setState({
        status: apiStatusConstants.failure,
      })
    }
  }

  handleLoadingStatus = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  handleRetryBtn = () => {
    this.getProfileData()
  }

  handeleSuccessStatus = () => {
    const {profileData} = this.state
    const {
      profilePic,
      userName,
      postsCount,
      followersCount,
      followingCount,
      userBio,
      stories,
      posts,
    } = profileData

    return (
      <div className="UserProfileContainer">
        <div className="TopContainer">
          <div className="imgContainer">
            <img src={profilePic} alt={userName} className="profilePic" />
          </div>
          <div className="ProfileData">
            <h1 className="userName">{userName}</h1>
            <div className="followersData">
              <p className="posts">{postsCount} posts</p>
              <p className="followers">{followersCount} followers</p>
              <p className="following">{followingCount} following</p>
            </div>
            <div>
              <p className="profileName">{userName}</p>
              <p className="userBio">{userBio}</p>
            </div>
          </div>
        </div>
        <div className="middleContainer">
          {stories.map(each => (
            <img src={each.image} alt="stories" className="storiesImage" />
          ))}
        </div>
        <hr className="line" />
        <div className="postsHeading">
          <BsGrid3X3 className="frame" />
          <h1 className="frameHeading">Posts</h1>
        </div>
        <div className="bottomContainer">
          {posts.map(each => (
            <img src={each.image} alt="stories" className="postsImage" />
          ))}
        </div>
      </div>
    )
  }

  handleFailureStatus = () => (
    <div className="FailureContainer">
      <img
        src="https://res.cloudinary.com/dliymxvtu/image/upload/v1704950070/alert-triangle_sonjny.svg"
        alt="alertImage"
        className="alertImage"
      />
      <p className="failureMsg">Something went wrong. Please try again</p>
      <button
        type="button"
        className="tryAgainBtn"
        onClick={this.handleRetryBtn}
      >
        Try again
      </button>
    </div>
  )

  renderStatusView = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.success:
        return this.handeleSuccessStatus()
      case apiStatusConstants.failure:
        return this.handleFailureStatus()
      case apiStatusConstants.progress:
        return this.handleLoadingStatus()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="UserProfile_Container">
        <Header />
        <div className="UserProfile_Body_Container">
          {this.renderStatusView()}
        </div>
      </div>
    )
  }
}

export default UserProfile
