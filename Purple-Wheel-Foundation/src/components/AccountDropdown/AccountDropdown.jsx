import { useLocation } from "react-router-dom";

import { IoAdd, IoCheckmark } from "react-icons/io5";

import { useAuth } from "../../context/AuthContext";
import generateAvatarUrl from "../../utils/generateAvatarUrl";

import "./AccountDropdown.css"

const AccountDropdown = ({ showProfiles = true }) => {
    const { user } = useAuth();
    const location = useLocation();

    const avatarUrl = generateAvatarUrl(user?.username);

    return (
        <div className="account-dropdown-wrapper">

            <div className="account-dropdown">
                <div className="account-dropdown-current">
                    <img
                        src={avatarUrl}
                        alt="Profile"
                    />

                    <span className="account-dropdown-username">
                        {user?.username}
                    </span>

                    {location.pathname === "/choose-account" && (
                        <span className="account-dropdown-check">
                            <IoCheckmark />
                        </span>
                    )}
                </div>

                <button className="account-dropdown-add">
                    <span className="account-dropdown-icon">
                        <IoAdd />
                    </span>

                    <span>Add Account</span>
                </button>
            </div>



            {showProfiles && (
                <div className="account-profiles">

                    <div className="account-profile-section">
                        <p className="account-profile-title">
                            Your Hot Life Entertainment Profile
                        </p>

                        <div className="account-profile-card">
                            <img src={avatarUrl} alt="Profile" />

                            <p>{user?.username}</p>
                        </div>
                    </div>


                    <div className="account-profile-section">
                        <p className="account-profile-title">
                            Your MP Life Profile
                        </p>

                        <div className="account-profile-card">
                            <img src={avatarUrl} alt="Profile" />

                            <p>{user?.username}</p>

                            {location.pathname.startsWith("/MP-LifeStyle") && (
                                <span className="account-dropdown-check account-dropdown-check-mp">
                                    <IoCheckmark />
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="account-profile-section">
                        <p className="account-profile-title">
                            Your Purple Wheel Foundation Profile
                        </p>

                        <div className="account-profile-card">
                            <img src={avatarUrl} alt="Profile" />

                            <p>{user?.username}</p>
                        </div>
                    </div>

                </div>
            )}


        </div>
    );
};

export default AccountDropdown;