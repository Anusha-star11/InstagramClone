import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProfilePage from './components/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
    <ProtectedRoute exact path="/myprofile" component={ProfilePage} />
    <Route path="/not-found" component={PageNotFound} />
    <Redirect to="/notfound" />
  </Switch>
)

export default App
