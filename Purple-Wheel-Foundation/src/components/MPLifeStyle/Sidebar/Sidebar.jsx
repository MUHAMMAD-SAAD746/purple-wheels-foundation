import { NavLink } from "react-router-dom";
import {
    IoHome,
    IoCompass,
    IoPeople,
    IoBarChart,
    IoSettings,
} from "react-icons/io5";

import MP from "../../../assets/MP.svg";

import "./Sidebar.css";

const menuItems = [
    {
        label: "Home",
        path: "/MP-LifeStyle",
        icon: IoHome,
    },
    {
        label: "Explore",
        path: "/explore",
        icon: IoCompass,
    },
    {
        label: "Creators",
        path: "/creators",
        icon: IoPeople,
    },
    {
        label: "Analytics",
        path: "/analytics",
        icon: IoBarChart,
    },
    {
        label: "Settings",
        path: "/settings",
        icon: IoSettings,
    },
];

const Sidebar = () => {
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
                    {menuItems.map(({ label, path, icon: Icon }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `sidebar-link ${isActive ? "active" : ""}`
                                }
                            >
                                <Icon className="sidebar-link-icon" />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </nav>

        </aside>
    );
};

export default Sidebar;