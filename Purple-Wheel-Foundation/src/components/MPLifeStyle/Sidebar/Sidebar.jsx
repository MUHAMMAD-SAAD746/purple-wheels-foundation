import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    IoHome,
    IoCompass,
    IoPeople,
    IoBarChart,
    IoSettings,
} from "react-icons/io5";

import MP from "../../../assets/MP.svg";

import SettingsDropdown from "../../../components/MPLifeStyle/SettingsDropdown/SettingsDropdown";

import "./Sidebar.css";

const menuItems = [
    {
        label: "Home",
        path: "/MP-LifeStyle",
        icon: IoHome,
        end: true,
    },
    {
        label: "Explore",
        path: "/MP-LifeStyle/explore",
        icon: IoCompass,
    },
    {
        label: "Creators",
        path: "/MP-LifeStyle/creators",
        icon: IoPeople,
    },
    {
        label: "Analytics",
        path: "/MP-LifeStyle/analytics",
        icon: IoBarChart,
    },
    {
        label: "Settings",
        path: "/settings",
        icon: IoSettings,
    },
];

const Sidebar = () => {
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);


    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <img src={MP} alt="MP Lifestyle" />
            </div>

            <nav className="sidebar-navigation" aria-label="Main navigation">

                <p className="sidebar-menu-title">
                    MAIN MENU
                </p>

                <ul className="sidebar-menu">
                    {/* {menuItems.map(({ label, path, icon: Icon, end}) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                end={end}
                                className={({ isActive }) =>
                                    `sidebar-link ${isActive ? "active" : ""}`
                                }
                            >
                                <Icon className="sidebar-link-icon" />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))} */}



                    {menuItems.map(({ label, path, icon: Icon, end }) => (
                        <li key={path}>
                            {label === "Settings" ? (
                                <>
                                    {/* Normal Settings link above 480px */}
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `sidebar-link sidebar-settings-desktop ${isActive ? "active" : ""
                                            }`
                                        }
                                    >
                                        <Icon className="sidebar-link-icon" />
                                        <span>{label}</span>
                                    </NavLink>

                                    {/* Settings dropdown trigger at 480px and below */}
                                    <div className="sidebar-settings-dropdown-wrapper">
                                        <button
                                            type="button"
                                            className="sidebar-link sidebar-settings-mobile-trigger"
                                            aria-label="Settings menu"
                                            onClick={() =>
                                                setShowSettingsDropdown((prev) => !prev)
                                            }
                                        >
                                            <Icon className="sidebar-link-icon" />
                                        </button>

                                        {showSettingsDropdown && (
                                            <SettingsDropdown
                                                onClose={() => setShowSettingsDropdown(false)}
                                            />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <NavLink
                                    to={path}
                                    end={end}
                                    className={({ isActive }) =>
                                        `sidebar-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    <Icon className="sidebar-link-icon" />
                                    <span>{label}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

            </nav>

        </aside>
    );
};

export default Sidebar;