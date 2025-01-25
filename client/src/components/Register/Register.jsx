import  { useState } from 'react';
import { Link } from 'react-router-dom';
// import { IoEyeOffOutline } from "react-icons/io5";
// import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate=useNavigate();
    // const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, formData);
        console.log(response);
        navigate("/login");
        // Handle form submission logic here
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <div className="register-container">
            <h2 className="register-title">Sign Up</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        // type={showPassword ? "text" : "password"}
                        type='password'
                        id="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {/* <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline/>}
                    </button> */}
                </div>
                <button type="submit" className="register-button">Create Account</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;