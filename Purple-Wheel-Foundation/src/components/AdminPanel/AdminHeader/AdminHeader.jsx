import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    IoChevronDown,
    IoPersonOutline,
    IoLogOutOutline,
    IoShieldCheckmarkOutline,
} from "react-icons/io5";

import "./AdminHeader.css";

const routeTitles = {
    "/admin": "Dashboard",
    "/admin/dashboard": "Dashboard",
    "/admin/users": "Users Management",
    "/admin/blogs": "Blogs Management",
    "/admin/comments": "Comments Management",
    "/admin/creators": "Creators Management",
    "/admin/reports": "Reports",
};

const AdminHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const pageTitle = routeTitles[location.pathname] || "Admin Panel";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            setShowDropdown(false);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };



    return (
        <header className="admin-header">
            <div className="admin-header-left">
                <h1 className="admin-header-title">{pageTitle}</h1>
                <p className="admin-header-subtitle">
                    Purple Wheel Foundation &mdash; Administration
                </p>
            </div>

            <div className="admin-header-actions">
                <div className="admin-header-profile-wrapper" ref={dropdownRef}>
                    <button
                        className="admin-header-profile-btn"
                        aria-label="Admin account menu"
                        onClick={() => setShowDropdown(prev => !prev)}
                    >
                        <div className="admin-header-avatar">
                            <IoShieldCheckmarkOutline className="admin-header-avatar-icon" />
                        </div>
                        <div className="admin-header-profile-info">
                            <span className="admin-header-profile-name">Administrator</span>
                            <span className="admin-header-profile-role">Super Admin</span>
                        </div>
                        <IoChevronDown
                            className={`admin-header-chevron ${showDropdown ? "admin-header-chevron--open" : ""}`}
                        />
                    </button>

                    {showDropdown && (
                        <div className="admin-header-dropdown">
                            <div className="admin-header-dropdown-header">
                                <div className="admin-header-dropdown-avatar">
                                    <IoShieldCheckmarkOutline />
                                </div>
                                <div>
                                    <p className="admin-header-dropdown-name">Administrator</p>
                                    <p className="admin-header-dropdown-role">Super Admin</p>
                                </div>
                            </div>

                            <div className="admin-header-dropdown-divider" />

                            <button className="admin-header-dropdown-item" onClick={() => setShowDropdown(false)}>
                                <IoPersonOutline />
                                <span>Admin Profile</span>
                            </button>

                            <div className="admin-header-dropdown-divider" />

                            <button className="admin-header-dropdown-item admin-header-dropdown-item--danger" onClick={handleLogout}>
                                <IoLogOutOutline />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
