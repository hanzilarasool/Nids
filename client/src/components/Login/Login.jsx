
import  { useState } from 'react';
import { Link } from 'react-router-dom';
// import { IoEyeOffOutline } from "react-icons/io5";
// import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../contexts/LogingContext';
import styles from "../Register/Register.module.css";
const Login = () => {
    const { login } = useLogin();
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    // const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
      await login(formData.email, formData.password);

        navigate("/predict");
        // Handle form submission logic here
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <div className={styles["register-page-container"]}>
            <div className={styles["register-img-container"]}>
                <div className={styles["register-container"]}>
                    <h2 className={styles["register-title"]}>Login</h2>
                    <form className={styles["register-form"]} onSubmit={handleSubmit}>
                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles["form-input"]}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]} htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles["form-input"]}
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className={styles["register-button"]}>Login</button>
                    </form>
                    <p className={styles["login-link"]}>
                        Do not have an account? <Link to="/register">register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;