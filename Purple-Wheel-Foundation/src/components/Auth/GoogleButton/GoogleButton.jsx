import { FcGoogle } from "react-icons/fc";
import "./GoogleButton.css";

function GoogleButton() {
    return (
        <button type="button" className="google-button">
            <FcGoogle className="google-icon" />

            <span>Continue with Google</span>
        </button>
    );
}

export default GoogleButton;