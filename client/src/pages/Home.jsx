import { Link } from "react-router-dom"
import "../styles/Home.css"

function Home() {
  return (
    <div className="home-page-container">
      <div className="hero-img-container">
<div className="hero-text-content">
  <h1>Network Intrusion <br />Detection System</h1>

  <div className="signup-login-container">
    <Link to="/register" className="signup-btn">Sign Up</Link>
    <Link to="/login" className="login-btn">Login</Link>
  </div>

</div>
<div className="right-side">


</div>
      </div>
    </div>
  )
}

export default Home