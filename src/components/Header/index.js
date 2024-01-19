import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  handleLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="headerContainer">
        <nav className="leftContainer">
          <Link to="/" className="link">
            <img
              src="https://res.cloudinary.com/dliymxvtu/image/upload/v1704695746/logo_nkmibk.svg"
              alt="website logo"
              className="logoImage"
            />
          </Link>
          <h1 className="InstaHeading">Insta Share</h1>
        </nav>
        <div className="rightContainer">
          <div className="searchContainer">
            <input
              type="search"
              placeholder="Search Caption"
              className="searchInput"
              id="searchInput"
            />
            {/* eslint-disable-next-line */}
            <button type="button" className="searchBtn" value="searchIcon">
              <FaSearch testid="searchIcon" />
            </button>
          </div>
          <Link className="link" to="/">
            <h4>Home</h4>
          </Link>
          <Link className="link" to="/myprofile">
            <h4>Profile</h4>
          </Link>
          <button
            type="button"
            className="LogoutBtn"
            onClick={this.handleLogoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
