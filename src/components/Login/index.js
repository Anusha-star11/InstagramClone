import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
// import Redirect from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    showErrorSubmitMsg: false,
  }

  handleusername = e => {
    this.setState({username: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  HandleLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  HandleLoginFailure = errorMsg => {
    this.setState({error: errorMsg, showErrorSubmitMsg: true})
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      this.HandleLoginSuccess(data.jwt_token)
    } else {
      this.HandleLoginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, error, showErrorSubmitMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="LoginContainer">
        <div className="ImageContainer">
          <img
            src="https://res.cloudinary.com/dliymxvtu/image/upload/v1704695063/Illustration_lvys5x.svg"
            alt="website login"
          />
        </div>
        <div className="Container2">
          <img
            src="https://res.cloudinary.com/dliymxvtu/image/upload/v1704695746/logo_nkmibk.svg"
            alt="website logo"
            className="logoImage"
          />
          <h4 className="InstaHeading">Insta Share</h4>
          <form className="formContainer" onSubmit={this.handleSubmit}>
            <div className="UsernameContainer">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                placeholder="username"
                id="username"
                value={username}
                onChange={this.handleusername}
              />
            </div>
            <div className="UsernameContainer">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                placeholder="password"
                id="password"
                value={password}
                onChange={this.handlePassword}
              />
              {showErrorSubmitMsg && <p className="errorMsg">{error}</p>}
            </div>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
