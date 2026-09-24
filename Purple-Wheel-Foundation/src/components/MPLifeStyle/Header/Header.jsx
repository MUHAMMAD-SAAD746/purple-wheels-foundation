import {
    IoNotificationsOutline,
    IoChevronDown,
    IoSettingsOutline,
} from "react-icons/io5";

import "./Header.css"

const Header = () => {
    return (
        <header className="mp-home-header">

            <div className="mp-home-welcome">
                <h1>Welcome Back, John!</h1>
                <p>Manage your blogs and content with ease.</p>
            </div>

            <div className="mp-home-actions">

                <button
                    className="mp-home-action notification-button"
                    aria-label="Notifications"
                >
                    <IoNotificationsOutline />
                </button>

                <button
                    className="mp-home-action profile-button"
                    aria-label="Account menu"
                >
                    <img
                        src=""
                        alt="John's profile"
                    />

                    <IoChevronDown className="action-chevron" />
                </button>

                <button
                    className="mp-home-action settings-button"
                    aria-label="Settings menu"
                >
                    <IoSettingsOutline />
                    <IoChevronDown className="action-chevron" />
                </button>

            </div>

        </header>
    )
}

export default Header