import './index.css'

const UserPost = props => {
  const {item} = props
  const {userName, storyUrl} = item
  return (
    <div className="UserPost_division">
      <img src={storyUrl} alt={userName} className="UserPost_image" />
      <p className="USERNAME">{userName}</p>
    </div>
  )
}

export default UserPost
