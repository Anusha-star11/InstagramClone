import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import UserPostComponent from '../UserPostComponent'
import SearchListComponent from '../SearchListComponent'
// import Header from '../Header'
import UserStories from '../UserStories'
import './index.css'

class Home extends Component {
  state = {
    searchInput: '',
    isSearchBtnClicked: false,
  }

  handleSearchBtn = () => {
    this.setState(prev => ({isSearchBtnClicked: !prev.isSearchBtnClicked}))
  }

  handleSearchChange = e => {
    const {searchInput} = this.state
    this.setState({searchInput: e.target.value})
  }

  handleLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {searchInput, isSearchBtnClicked} = this.state
    return (
      <div className="HomeContainer">
        <div className="home_headerContainer">
          <nav className="home_leftContainer">
            <Link to="/" className="link">
              <img
                src="https://res.cloudinary.com/dliymxvtu/image/upload/v1704695746/logo_nkmibk.svg"
                alt="website logo"
                className="home_logoImage"
              />
            </Link>
            <h1 className="home_InstaHeading">Insta Share</h1>
          </nav>

          <div className="home_rightContainer">
            <div className="home_searchContainer">
              <input
                type="search"
                value={searchInput}
                placeholder="Search Caption"
                className="home_searchInput"
                onChange={this.handleSearchChange}
              />
              {/* eslint-disable-next-line */}
              <button
                type="button"
                className="home_searchBtn"
                testid="searchIcon"
                onClick={this.handleSearchBtn}
              >
                <FaSearch />
              </button>
            </div>
            <Link className="home_link" to="/">
              <h4>Home</h4>
            </Link>
            <Link className="home_link" to="/myprofile">
              <h4>Profile</h4>
            </Link>
            <button
              type="button"
              className="home_LogoutBtn"
              onClick={this.handleLogoutBtn}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="Home_Body_Container">
          {isSearchBtnClicked ? (
            <SearchListComponent searchInput={searchInput} />
          ) : (
            <div>
              <UserStories />
              <UserPostComponent />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
