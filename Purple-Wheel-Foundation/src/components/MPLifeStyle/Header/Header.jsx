import { useState, useEffect, useRef } from "react";

import {
    IoNotificationsOutline,
    IoChevronDown,
    IoSettingsOutline,
} from "react-icons/io5";


import { useAuth } from "../../../context/AuthContext";
import generateAvatarUrl from "../../../utils/generateAvatarUrl";
import AccountDropdown from "../../../components/AccountDropdown/AccountDropdown";
import SettingsDropdown from "../../../components/MPLifeStyle/SettingsDropdown/SettingsDropdown";

import "./Header.css"

const Header = () => {
    const { user, setUser } = useAuth();

    const avatarUrl = user?.profileImage || generateAvatarUrl(user?.username);

    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

    const accountRef = useRef(null);
    const settingsRef = useRef(null);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setShowAccountDropdown(false);
            }

            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettingsDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <header className="mp-home-header">

            <div className="mp-home-welcome">
                <h1>Welcome Back, {user.username}!</h1>
                <p>Manage your blogs and content with ease.</p>
            </div>

            <div className="mp-home-actions">

                <button
                    className="mp-home-action notification-button"
                    aria-label="Notifications"
                >
                    <IoNotificationsOutline />
                </button>



                <div className="profile-dropdown-wrapper" ref={accountRef}>
                    <button
                        className="mp-home-action profile-button"
                        aria-label="Account menu"
                        onClick={() => setShowAccountDropdown((prev) => !prev)}
                    >
                        <img
                            src={avatarUrl}
                            alt={`${user?.username}'s profile`}
                        />

                        <IoChevronDown className="action-chevron" />
                    </button>

                    {showAccountDropdown && (
                        <AccountDropdown />
                    )}
                </div>



                <div className="settings-dropdown-wrapper" ref={settingsRef}>
                    <button
                        className="mp-home-action settings-button"
                        aria-label="Settings menu"
                        onClick={() => setShowSettingsDropdown((prev) => !prev)}
                    >
                        <IoSettingsOutline />
                        <IoChevronDown className="action-chevron" />
                    </button>


                    {showSettingsDropdown && (
                        <SettingsDropdown
                            onClose={() => setShowSettingsDropdown(false)}
                        />
                    )}
                </div>

            </div>
        </header>
    )
}

export default Header