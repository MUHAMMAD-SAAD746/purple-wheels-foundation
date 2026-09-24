import { Outlet } from "react-router-dom";
import Sidebar from "../../components/MPLifeStyle/sidebar/Sidebar";

import "./MpLifeStyle.css";

const MpLifeStyle = () => {
    return (
        <div className="mp-lifestyle">
            <Sidebar />

            <main className="mp-lifestyle-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MpLifeStyle;