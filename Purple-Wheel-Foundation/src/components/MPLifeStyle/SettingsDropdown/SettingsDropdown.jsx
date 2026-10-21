import { useNavigate } from "react-router-dom";
import {
    IoPerson,
    IoBookmark,
    IoSettings,
} from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import "./SettingsDropdown.css";

const SettingsDropdown = ({ onClose }) => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            setUser(null);
            onClose();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleNavigate = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <div className="settings-dropdown">
            <div className="settings-dropdown-options">
                <div
                    className="settings-dropdown-item"
                    onClick={() => handleNavigate("/settings")}
                >
                    <IoPerson />
                    <span>View Profile</span>
                </div>

                <div
                    className="settings-dropdown-item"
                    onClick={() =>
                        handleNavigate("/MP-LifeStyle/saved-post")
                    }
                >
                    <IoBookmark />
                    <span>Saved Post</span>
                </div>

                <div
                    className="settings-dropdown-item"
                    onClick={() =>
                        handleNavigate("/settings#accounts")
                    }
                >
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
    );
};

export default SettingsDropdown;