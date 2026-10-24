import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    IoGridOutline,
    IoPeopleOutline,
    IoDocumentTextOutline,
    IoChatbubblesOutline,
    IoStarOutline,
    IoBarChartOutline,
    IoMenuOutline,
    IoCloseOutline,
} from "react-icons/io5";

import "./AdminSidebar.css";

const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: IoGridOutline, end: true },
    { label: "Users", path: "/admin/users", icon: IoPeopleOutline },
    { label: "Blogs", path: "/admin/blogs", icon: IoDocumentTextOutline },
    { label: "Comments", path: "/admin/comments", icon: IoChatbubblesOutline },
    { label: "Creators", path: "/admin/creators", icon: IoStarOutline },
    { label: "Reports", path: "/admin/reports", icon: IoBarChartOutline },
];

const AdminSidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile top bar */}
            <div className="admin-sidebar-mobile-topbar">
                <div className="admin-sidebar-mobile-brand">
                    <div className="admin-sidebar-logo-circle">PW</div>
                    <div className="admin-sidebar-mobile-brand-text">
                        <span className="admin-sidebar-brand-name">Purple Wheel</span>
                        <span className="admin-sidebar-brand-label">Admin Panel</span>
                    </div>
                </div>
                <button
                    className="admin-sidebar-mobile-toggle"
                    aria-label="Toggle navigation"
                    onClick={() => setMobileOpen(prev => !prev)}
                >
                    {mobileOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                </button>
            </div>

            {/* Overlay for mobile */}
            {mobileOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${mobileOpen ? "admin-sidebar--open" : ""}`}>

                <div className="admin-sidebar-brand">
                    <div className="admin-sidebar-logo-circle">PW</div>
                    <div className="admin-sidebar-brand-text">
                        <span className="admin-sidebar-brand-name">Purple Wheel</span>
                        <span className="admin-sidebar-brand-label">Admin Panel</span>
                    </div>
                </div>

                <nav className="admin-sidebar-nav" aria-label="Admin navigation">
                    <p className="admin-sidebar-section-title">MAIN MENU</p>
                    <ul className="admin-sidebar-menu">
                        {menuItems.map(({ label, path, icon: Icon, end }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    end={end}
                                    className={({ isActive }) =>
                                        `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
                                    }
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon className="admin-sidebar-link-icon" />
                                    <span>{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-sidebar-footer-badge">
                        <span className="admin-sidebar-footer-dot"></span>
                        Admin Access
                    </div>
                </div>

            </aside>
        </>
    );
};

export default AdminSidebar;
