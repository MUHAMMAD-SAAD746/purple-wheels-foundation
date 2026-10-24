import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/MP-LifeStyle" replace />;
    }

    return children;
}

export default AdminProtectedRoute;