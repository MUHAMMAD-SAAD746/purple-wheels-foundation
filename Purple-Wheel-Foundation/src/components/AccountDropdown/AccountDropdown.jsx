import { useLocation } from "react-router-dom";

import { IoAdd, IoCheckmark } from "react-icons/io5";

import { useAuth } from "../../context/AuthContext";
import generateAvatarUrl from "../../utils/generateAvatarUrl";

import "./AccountDropdown.css"

const AccountDropdown = ({ showProfiles = true }) => {
    const { user } = useAuth();
    const location = useLocation();

    const avatarUrl = user?.profileImage || generateAvatarUrl(user?.username);

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
        </div>
    );
};

export default AccountDropdown;