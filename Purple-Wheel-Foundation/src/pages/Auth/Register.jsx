import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";
import AuthInput from "../../components/Auth/AuthInput/AuthInput";
import GoogleButton from "../../components/Auth/GoogleButton/GoogleButton";
import "./auth.css"

function Register() {
    return (
        <div className="auth-page">

            <AuthImagePanel />

            <div className="auth-form-container">

                <div className="auth-form-header">
                    <h1>Create Account</h1>
                    <p>Create your account to get started</p>
                </div>

                <form className="auth-form">

                    <AuthInput
                        id="name"
                        name="name"
                        label="Your Name"
                        type="text"
                        placeholder="Enter Your Full Name"
                    />

                    <AuthInput
                        id="email"
                        name="email"
                        label="Email Or Phone No"
                        type="email"
                        placeholder="johndoe@gmail.com"
                    />

                    <AuthInput
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Create Password (min 8 chars)"
                    />

                    <AuthInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
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
                        <a href="/terms">Terms</a>
                        {" & "}
                        <a href="/privacy-policy">Privacy Policy</a>.
                    </p>
                </div>





                <p className="auth-switch-text">
                    Already have an account?{" "}
                    <a href="/login">Sign In</a>
                </p>

            </div>

        </div>
    );
}

export default Register;