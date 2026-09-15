import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";

import "./auth.css";

function ForgotPassword() {
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
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                    />
                </form>

                <button type="submit" className="submit-button">
                    Send Code
                </button>
            </div>
        </div>
    )
}

export default ForgotPassword;