import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfilePage extends Component {
  state = {
    profileData: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({status: apiStatusConstants.progress})
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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

      const updated = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userName: data.profile.user_name,
        userBio: data.profile.user_bio,
        posts: data.profile.posts,
        stories: data.profile.stories,
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
    <div className='loader-container' testid='loader'>
      <Loader type='TailSpin' color='#4094EF' height={50} width={50} />
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
      <div className='myProfileContainer'>
        <div className='TopContainer'>
          <div className='imgContainer'>
            <img src={profilePic} alt='my profile' className='profilePic' />
          </div>
          <div className='ProfileData'>
            <h1 className='userName'>{userName}</h1>
            <div className='followersData'>
              <p className='posts'>{postsCount} posts</p>
              <p className='followers'>{followersCount} followers</p>
              <p className='following'>{followingCount} following</p>
            </div>
            <div>
              <p className='profileName'>{userName}</p>
              <p className='userBio'>{userBio}</p>
            </div>
          </div>
        </div>
        <ul className='middleContainer'>
          {stories.map(each => (
            <img src={each.image} alt='my story' className='storiesImage' />
          ))}
        </ul>
        <hr className='line' />
        <div className='postsHeading'>
          <BsGrid3X3 className='frame' />
          <h1 className='frameHeading'>Posts</h1>
        </div>
        {posts.length === 0 ? (
          <div className='NoPostsContainer'>
            <BiCamera />
            <h1>No Posts</h1>
          </div>
        ) : (
          <ul className='bottomContainer'>
            {posts.map(each => (
              <img src={each.image} alt='my posts' className='postsImage' />
            ))}
          </ul>
        )}
      </div>
    )
  }

  handleFailureStatus = () => (
    <div className='FailureContainer'>
      <img
        src='https://res.cloudinary.com/dliymxvtu/image/upload/v1704950070/alert-triangle_sonjny.svg'
        alt='alertImage'
        className='alertImage'
      />
      <p className='failureMsg'>Something went wrong. Please try again</p>
      <button
        type='button'
        className='tryAgainBtn'
        onClick={this.handleRetryBtn}
      >
        Try again
      </button>
    </div>
  )

  render() {
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
}

export default MyProfilePage
