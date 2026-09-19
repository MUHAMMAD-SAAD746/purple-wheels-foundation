import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";

import "./auth.css";


function CreatePassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAdult, setIsAdult] = useState(false);

    console.log(email)

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!isAdult) {
            setError("You must be 18 years of age or older.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/api/auth/update-password",
                {
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to update password."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-form-page auth-page">
            <AuthImagePanel />

            <div className="auth-form-container">
                <div className="auth-form-header">
                    <h1>Forgot Password</h1>
                    <p>Enter you email below and we will send you a code to reset password.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create Password (min 8 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <AuthInput
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        name="confirm password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            name="age above 18"
                            checked={isAdult}
                            onChange={(e) => setIsAdult(e.target.checked)}
                        />

                        <label htmlFor="remember">
                            I am 18 years of age or older
                        </label>
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePassword;