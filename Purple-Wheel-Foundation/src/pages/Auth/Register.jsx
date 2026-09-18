import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";
import GoogleButton from "../../components/Auth/GoogleButton/GoogleButton";
import "./auth.css"


function Register() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        ageAbove18: false
    });

    const [error, setError] = useState("");


    const validateForm = () => {
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            return "All fields are required";
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match";
        }

        if (!formData.ageAbove18) {
            return "You must be 18 years or older";
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
                "http://localhost:3000/api/auth/register",
                {
                    username: formData.username,
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
            setError(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className="auth-page">

            <AuthImagePanel />

            <div className="auth-form-container">

                <div className="auth-form-header">
                    <h1>Create Account</h1>
                    <p>Create your account to get started</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <AuthInput
                        id="username"
                        name="username"
                        label="Your Name"
                        type="text"
                        placeholder="Enter Your Full Name"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value
                            })
                        }
                    />

                    <AuthInput
                        id="email"
                        name="email"
                        label="Your Email"
                        type="email"
                        placeholder="johndoe@gmail.com"
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
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Create Password (min 8 chars)"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                    />

                    <AuthInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value
                            })
                        }
                    />

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            name="age above 18"
                            checked={formData.ageAbove18}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    ageAbove18: e.target.checked
                                })
                            }
                        />

                        <label htmlFor="remember">
                            I am 18 years of age or older
                        </label>
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Create Account
                    </button>

                </form>

                <div>
                    <GoogleButton />

                    <p className="auth-switch-text">
                        By continuing you agree to our{" "}
                        <Link to="/terms">Terms</Link>
                        {" & "}
                        <Link to="/privacy-policy">Privacy Policy</Link>.
                    </p>
                </div>


                <p className="auth-switch-text">
                    Already have an account?{" "}
                    <Link to="/login">Sign In</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;