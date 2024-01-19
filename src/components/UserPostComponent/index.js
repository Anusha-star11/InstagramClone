import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Post from '../Post'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserPostComponent extends Component {
  state = {
    postList: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPostListData()
  }

  getPostListData = async () => {
    this.setState({status: apiStatusConstants.progress})
    const url = 'https://apis.ccbp.in/insta-share/posts'
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

      const updated = data.posts.map(each => ({
        commentUserId1: each.comments[0].user_id,
        commentUserName1: each.comments[0].user_name,
        commentsComment1: each.comments[0].comment,
        commentUserId2: each.comments[1].user_id,
        commentUserName2: each.comments[1].user_name,
        commentsComment2: each.comments[1].comment,
        postImageurl: each.post_details.image_url,
        postCaption: each.post_details.caption,
        profilePic: each.profile_pic,
        userName: each.user_name,
        userId: each.user_id,
        postId: each.post_id,
        createdAt: each.created_at,
        likesCount: each.likes_count,
      }))

      this.setState({postList: updated, status: apiStatusConstants.success})
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

  handeleSuccessStatus = () => {
    const {postList} = this.state

    return (
      <div className="userPostContainer">
        {postList.map(each => (
          <Post key={each.postId} item={each} />
        ))}
      </div>
    )
  }

  handleRetryBtn = () => {
    this.getPostListData()
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

export default UserPostComponent
