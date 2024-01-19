import {Component} from 'react'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Post extends Component {
  state = {
    isLike: false,
  }

  handleLikeBtn = async () => {
    await this.setState(prev => ({isLike: !prev.isLike}))
    const jwtToken = Cookies.get('jwt_token')
    const {isLike} = this.state
    const {item} = this.props
    const {postId} = item
    const likeReqestBody = {
      like_status: isLike,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const option = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeReqestBody),
    }
    const response = await fetch(url, option)
    const data = await response.json()
  }

  render() {
    const {item} = this.props
    const {
      userName,
      profilePic,
      postImageurl,
      likesCount,
      postCaption,
      commentUserName1,
      commentsComment1,
      commentUserName2,
      commentsComment2,
      createdAt,
      postId,
      userId,
    } = item
    const {isLike} = this.state

    return (
      <li className="PostContainer">
        <div className="TopDivision">
          <img
            src={profilePic}
            alt="post author profile"
            className="ProfilePic"
          />
          <Link to={`/users/${userId}`} className="link">
            <h1 className="username">{userName}</h1>
          </Link>
        </div>

        <div className="middleDivision">
          <img src={postImageurl} alt="post" className="PostImageUrl" />
        </div>
        <div className="bottomDivision">
          <div className="vectorDivision">
            {isLike ? (
              <button
                type="button"
                onClick={this.handleLikeBtn}
                className="likeBtn"
                testid="unLikeIcon"
              >
                <BsHeartFill color="red" className="like" />
              </button>
            ) : (
              <button
                type="button"
                onClick={this.handleLikeBtn}
                className="likeBtn"
                testid="likeIcon"
              >
                <BsHeart className="like" />
              </button>
            )}

            <FaRegComment className="comment" />
            <BiShareAlt className="share" />
          </div>
          <p className="likesCount">
            {isLike ? likesCount + 1 : likesCount} likes
          </p>
          <p className="caption">{postCaption}</p>
          <div className="commentSection">
            <span className="commentline">{commentUserName1}</span>
            <p className="commentline">{commentsComment1}</p>
          </div>
          <div className="commentSection">
            <span className="commentline">{commentUserName2}</span>
            <p className="commentline">{commentsComment2}</p>
          </div>
          <p className="createdAt">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default Post
