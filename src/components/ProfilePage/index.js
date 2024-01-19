import Header from '../Header'
import MyProfilePage from '../MyProfilePage'
import './index.css'

const ProfilePage = () => (
  <div className="ProfilePage_Container">
    <Header />
    <div className="ProfilePage_Body_Container">
      <MyProfilePage />
    </div>
  </div>
)

export default ProfilePage
