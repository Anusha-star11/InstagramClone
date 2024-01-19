import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="PageNotFound_container">
    <img
      src="https://res.cloudinary.com/dliymxvtu/image/upload/v1705482429/erroring_1_ta2t0b.svg"
      alt="page not found"
      className="pageNotFoundImage"
    />
    <h1 className="PNFHeading">Page Not Found</h1>
    <p className="PNFParagraph">
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="HomeBTN">
        Home Page
      </button>
    </Link>
  </div>
)

export default PageNotFound
