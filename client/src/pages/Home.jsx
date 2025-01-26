import { Link } from "react-router-dom"
import "../styles/Home.css"
import { useLogin } from "../contexts/LogingContext"
function Home() {
  const { user } = useLogin();
  return (
    <div className="home-page-container">
      <div className="hero-img-container">
<div className="hero-text-content">
  <h1>Network Intrusion <br />Detection System</h1>

 {user? <Link to="/predict" style={{color:"white",display:"inline-block"}}><div className="predict-btn" style={{position:"relative",zIndex:2,color:"white",padding:"8px 12px",borderRadius:"9px",backgroundColor:"#f5a623;",marginTop:"16px",display:"inline-block"}}>Predict</div></Link> :  <div className="signup-login-container">
    <Link to="/register" className="signup-btn">Sign Up</Link>
    <Link to="/login" className="login-btn">Login</Link>
  </div>}

</div>
<div className="right-side">


</div>
      </div>
    </div>
  )
}

export default Home