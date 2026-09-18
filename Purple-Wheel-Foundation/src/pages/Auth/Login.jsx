import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";
import GoogleButton from "../../components/Auth/GoogleButton/GoogleButton";

import "./auth.css";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");


    const validateForm = () => {
        if (!formData.email || !formData.password) {
            return "Email and password are required";
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters";
        }

        return null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    withCredentials: true
                }
            );

            setUser(response.data.user);
            navigate("/choose-account");

        } catch (error) {
            setError(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };


    return (
        <div className="auth-page">

            <AuthImagePanel />

            <div className="auth-form-container">

                <div className="auth-form-header">
                    <h1>Sign In</h1>
                    <p>Enter your credentials to access your dashboard</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <AuthInput
                        label="Email Address"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        icon={<FaEnvelope />}
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    />

                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon={<FaLock />}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                    />

                    <Link to="/forgot-password" className="forgot-password">
                        Forgot Password?
                    </Link>

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                        />

                        <label htmlFor="remember">
                            Remember me on this device
                        </label>
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>

                <GoogleButton />

                <p className="auth-switch-text">
                    Don't have an account?{" "}
                    <Link to="/register">Sign Up</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;