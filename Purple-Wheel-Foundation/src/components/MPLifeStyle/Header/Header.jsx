import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    IoNotificationsOutline,
    IoChevronDown,
    IoSettingsOutline,
    IoPerson,
    IoBookmark,
    IoSettings,
} from "react-icons/io5";

import { MdLogout } from "react-icons/md";

import { useAuth } from "../../../context/AuthContext";
import generateAvatarUrl from "../../../utils/generateAvatarUrl";
import AccountDropdown from "../../../components/AccountDropdown/AccountDropdown";

import "./Header.css"

const Header = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const avatarUrl = generateAvatarUrl(user?.username);

    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);


    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            );

            setUser(null);
            setShowSettingsDropdown(false);

            navigate("/login");

        } catch (error) {
            console.error("Logout error:", error);
        }
    };


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



                <div className="profile-dropdown-wrapper">
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



                <div className="settings-dropdown-wrapper">
                    <button
                        className="mp-home-action settings-button"
                        aria-label="Settings menu"
                        onClick={() => setShowSettingsDropdown((prev) => !prev)}
                    >
                        <IoSettingsOutline />
                        <IoChevronDown className="action-chevron" />
                    </button>




                    {showSettingsDropdown && (
                        <div className="settings-dropdown">
                            <div className="settings-dropdown-options">
                                <div className="settings-dropdown-item">
                                    <IoPerson />
                                    <span>View Profile</span>
                                </div>

                                <div className="settings-dropdown-item">
                                    <IoBookmark />
                                    <span>Saved Post</span>
                                </div>

                                <div className="settings-dropdown-item">
                                    <IoSettings />
                                    <span>Settings</span>
                                </div>
                            </div>

                            <div className="settings-dropdown-logout-section">
                                <div
                                    className="settings-dropdown-logout"
                                    onClick={handleLogout}
                                >
                                    <MdLogout />
                                    <span>Log Out</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}

export default Header