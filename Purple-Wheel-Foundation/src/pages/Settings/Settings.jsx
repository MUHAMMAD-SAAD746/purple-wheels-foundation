import { useState } from "react";
import axios from "axios";

import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";

import PurpleWheelLogo from "../../assets/purple-wheel-dark.png";
import Instagram from "../../assets/icons/instagram.svg";
import Tiktok from "../../assets/icons/tiktok.svg";
import Facebook from "../../assets/icons/facebook.svg";
import Linkedin from "../../assets/icons/linkedin.svg";
import Twitter from "../../assets/icons/twitter.svg";
import { IoSettingsOutline, IoChevronDown } from "react-icons/io5";
import { MdLogout } from "react-icons/md";


import { useAuth } from "../../context/AuthContext";

import "./Settings.css";

const Settings = () => {
    const { user, setUser } = useAuth();
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    const nameParts = user?.username?.split(" ") || [];

    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");



    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/logout",
                {},
                { withCredentials: true }
            );

            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };




    return (
        <div className="settings-page">

            <div className="settings-header">
                <div className="settings-logo">
                    <img src={PurpleWheelLogo} alt="Purple Wheel" />
                </div>

                <div className="settings-header-right">
                    <IoSettingsOutline className="settings-icon" />

                    <div className="settings-profile-wrapper">
                        <div
                            className="settings-profile"
                            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                        >
                            <img
                                src={user?.profileImage || ""}
                                alt="Profile"
                            />

                            <IoChevronDown className="settings-chevron" />
                        </div>

                        {showAccountDropdown && (
                            <AccountDropdown />
                        )}
                    </div>
                </div>
            </div>


            <main className="setting-main-content">
                <div className="settings-profile-card">
                    <div className="settings-profile-image">
                        <img
                            src={user?.profileImage || ""}
                            alt="Profile"
                        />
                    </div>

                    <div className="settings-user-info">
                        <h3>{user?.username}</h3>
                        <p className="settings-email">{user?.email}</p>
                        <p className="settings-phone">
                            {user?.phone || "Phone number not available"}
                        </p>
                    </div>
                </div>



                <div className="settings-personal-info">
                    <h3>PERSONAL INFORMATION</h3>

                    <form>
                        <div className="settings-form-row">
                            <div className="settings-form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    readOnly
                                />
                            </div>

                            <div className="settings-form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    readOnly
                                />
                            </div>

                            <div className="settings-form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" />
                            </div>
                        </div>

                        <div className="settings-form-row">
                            <div className="settings-form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={user?.email || ""}
                                    readOnly
                                />
                            </div>

                            <div className="settings-form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" id="phone" />
                            </div>
                        </div>
                    </form>
                </div>



                <div className="settings-security">
                    <h3>SECURITY</h3>

                    <form>
                        <div className="settings-form-row">
                            <div className="settings-form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" />
                            </div>

                            <div className="settings-form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" />
                            </div>
                        </div>
                    </form>
                </div>


                <div className="settings-connect-accounts">
                    <h3>CONNECT ACCOUNTS</h3>

                    <div className="settings-social-grid">

                        <div className="settings-social-card">
                            <div className="settings-social-info">
                                <div className="settings-social-icon facebook-bg">
                                    <img src={Facebook} alt="Facebook" />
                                </div>
                                <span>Facebook</span>
                            </div>
                            <button>Connect</button>
                        </div>

                        <div className="settings-social-card">
                            <div className="settings-social-info">
                                <div className="settings-social-icon instagram-bg">
                                    <img src={Instagram} alt="Instagram" />
                                </div>
                                <span>Instagram</span>
                            </div>
                            <button>Connect</button>
                        </div>

                        <div className="settings-social-card">
                            <div className="settings-social-info">
                                <div className="settings-social-icon linkedin-bg">
                                    <img src={Linkedin} alt="linkedin" />
                                </div>
                                <span>LinkedIn</span>
                            </div>
                            <button>Connect</button>
                        </div>

                        <div className="settings-social-card">
                            <div className="settings-social-info">
                                <div className="settings-social-icon twitter-bg">
                                    <img src={Twitter} alt="twitter" />
                                </div>
                                <span>Twitter (X)</span>
                            </div>
                            <button>Connect</button>
                        </div>

                        <div className="settings-social-card">
                            <div className="settings-social-info">
                                <div className="settings-social-icon tiktok-bg">
                                    <img src={Tiktok} alt="TikTok" />
                                </div>
                                <span>TikTok</span>
                            </div>
                            <button>Connect</button>
                        </div>

                        <div className="settings-social-card">
                            <div className="settings-social-info">
                                <div className="settings-social-icon linkedin-bg">
                                    <img src={Linkedin} alt="linkedin" />
                                </div>
                                <span>LinkedIn</span>
                            </div>
                            <button>Connect</button>
                        </div>

                    </div>
                </div>


                <div className="settings-notification-preferences">
                    <h3>Notification Preferences</h3>

                    <div className="settings-notification-grid">

                        <div className="settings-notification-card">
                            <div>
                                <p>Email Notifications</p>
                                <span>Receive notifications via email</span>
                            </div>

                            <label className="settings-checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                        </div>

                        <div className="settings-notification-card">
                            <div>
                                <p>In-App Notifications</p>
                                <span>Show notifications within the app</span>
                            </div>

                            <label className="settings-checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                        </div>

                        <div className="settings-notification-card">
                            <div>
                                <p>SMS Notifications</p>
                                <span>Receive text message notifications</span>
                            </div>

                            <label className="settings-checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                        </div>

                    </div>
                </div>



                <div 
                    className="settings-logout-section"
                    onClick={handleLogout}
                >
                    <div className="settings-logout-info">
                        <p>LogOut?</p>
                        <span>
                            Keep your account secure by regularly updating your password
                            and reviewing your security settings.
                        </span>
                    </div>

                    <div className="settings-logout-icon">
                        <MdLogout />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Settings;