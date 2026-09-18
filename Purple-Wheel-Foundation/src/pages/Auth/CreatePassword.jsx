import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";

import "./auth.css";


function CreatePassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    console.log(email)

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);


    return (
        <div className="auth-form-page auth-page">
            <AuthImagePanel />

            <div className="auth-form-container">
                <div className="auth-form-header">
                    <h1>Forgot Password</h1>
                    <p>Enter you email below and we will send you a code to reset password.</p>
                </div>

                <form className="auth-form">
                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create Password (min 8 chars)"
                    />

                    <AuthInput
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        name="confirm password"
                        placeholder="Confirm Password"
                    />

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            name="age above 18"
                        />

                        <label htmlFor="remember">
                            I am 18 years of age or older
                        </label>
                    </div>

                    <button type="submit" className="submit-button">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePassword;