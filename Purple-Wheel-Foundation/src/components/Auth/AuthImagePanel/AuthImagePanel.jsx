import heroImage from "../../../assets/purple-wheel-logo.png";

import "./AuthImagePanel.css";

function AuthImagePanel() {
    return (
        <div className="auth-image-panel">
            <img src={heroImage} alt="Welcome" />
        </div>
    );
}

export default AuthImagePanel;