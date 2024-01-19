import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserPost from '../UserPost'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserStories extends Component {
  state = {
    userListItems: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserListItemsData()
  }

  getUserListItemsData = async () => {
    this.setState({status: apiStatusConstants.progress})
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedItems = await data.users_stories.map(each => ({
        storyUrl: each.story_url,
        id: each.user_id,
        userName: each.user_name,
      }))

      this.setState({
        userListItems: updatedItems,
        status: apiStatusConstants.success,
      })
    } else {
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
    this.getUserListItemsData()
  }

  handeleSuccessStatus = () => {
    const {userListItems} = this.state
    const settings = {
      arrows: true,
      dots: false,
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 1,
    }

    return (
      <div>
        <Slider {...settings}>
          {userListItems.map(each => (
            <UserPost key={each.id} item={each} />
          ))}
        </Slider>
      </div>
    )
  }

  handleFailureStatus = () => (
    <div className="UserStories_FailureContainer">
      <img
        src="https://res.cloudinary.com/dliymxvtu/image/upload/v1704950070/alert-triangle_sonjny.svg"
        alt="alertImage"
        className="UserStories_alertImage"
      />
      <p className="UserStories_failureMsg">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="UserStories_tryAgainBtn"
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

export default UserStories
