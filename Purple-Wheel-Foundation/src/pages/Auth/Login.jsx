import { FaEnvelope, FaLock } from "react-icons/fa";

import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";
import GoogleButton from "../../components/Auth/GoogleButton/GoogleButton";

import "./auth.css";

function Login() {
    return (
        <div className="auth-page">

            <AuthImagePanel />

            <div className="auth-form-container">

                <div className="auth-form-header">
                    <h1>Sign In</h1>
                    <p>Enter your credentials to access your dashboard</p>
                </div>

                <form className="auth-form">

                    <AuthInput
                        label="Email Address"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        icon={<FaEnvelope />}
                    />

                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon={<FaLock />}
                    />

                    <a href="/forgot-password" className="forgot-password">
                        Forgot Password?
                    </a>

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

                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>

                <GoogleButton />

                <p className="auth-switch-text">
                    Don't have an account?{" "}
                    <a href="/register">Sign Up</a>
                </p>

            </div>

        </div>
    );
}

export default Login;