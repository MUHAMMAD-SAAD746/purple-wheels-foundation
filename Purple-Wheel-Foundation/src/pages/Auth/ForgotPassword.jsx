import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";

import "./auth.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                "http://localhost:3000/api/auth/forgot-password",
                {
                    email
                }
            );

            console.log(response.data);

            navigate("/verification", {
                state: { email }
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }


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
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Code"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;