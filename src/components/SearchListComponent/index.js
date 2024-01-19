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

class SearchListComponent extends Component {
  state = {
    searchList: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchList()
  }

  getSearchList = async () => {
    const {searchInput} = this.props

    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
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

      this.setState({searchList: updated, status: apiStatusConstants.success})
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
    const {searchList} = this.state
    if (searchList.length === 0) {
      return (
        <div className="SearchNotFound_contianer">
          <img
            src="https://res.cloudinary.com/dliymxvtu/image/upload/v1705479783/Group_ybyzes.svg"
            alt="search not found"
            className="SearchNotFound"
          />
          <h1 className="searchNotFoundHeading">Search Not Found</h1>
          <p className="searchNotFoundParagraph">
            Try different keyword or search again
          </p>
        </div>
      )
    }
    return (
      <div>
        <h1 className="searchResultsHeading">Search Results</h1>
        <div className="SearchListContainer">
          {searchList.map(each => (
            <Post key={each.postId} item={each} />
          ))}
        </div>
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
        alt="failure view"
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

export default SearchListComponent
