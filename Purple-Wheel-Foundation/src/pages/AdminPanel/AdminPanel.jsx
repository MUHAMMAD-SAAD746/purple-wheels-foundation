import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminPanel/AdminSidebar/AdminSidebar";
import AdminHeader from "../../components/AdminPanel/AdminHeader/AdminHeader";
import "./AdminPanel.css";

const AdminPanel = () => {
    return (
        <div className="admin-panel-layout">
            <AdminSidebar />
            <div className="admin-panel-main-wrapper">
                <AdminHeader />
                <main className="admin-panel-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
