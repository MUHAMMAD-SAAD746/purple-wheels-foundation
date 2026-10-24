import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verification from "./pages/Auth/Verification";
import CreatePassword from "./pages/Auth/CreatePassword";
import ChooseAcc from "./pages/Auth/ChooseYourAcc/ChooseAcc";
import LandingPage from "./pages/LandingPage/LandingPage";
import MpLifeStyle from "./pages/MpLifeStyle/MpLifeStyle";
import Home from "./pages/MpLifeStyle/Home/Home";
import PostDetail from "./pages/MpLifeStyle/PostDetail/PostDetail";
import Explore from "./pages/MpLifeStyle/Explore/Explore";
import Creators from "./pages/MpLifeStyle/Creators/Creators";
import Analytics from "./pages/MpLifeStyle/Analytics/Analytics";
import SavedPost from "./pages/MpLifeStyle/SavedPost/SavedPost";
import Settings from "./pages/Settings/Settings";

// --- Admin Panel (additive only) ---
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminDashboard from "./pages/AdminPanel/Dashboard/Dashboard";
import AdminUsers from "./pages/AdminPanel/Users/Users";
import AdminBlogs from "./pages/AdminPanel/Blogs/Blogs";
import AdminComments from "./pages/AdminPanel/Comments/Comments";
import AdminCreators from "./pages/AdminPanel/Creators/Creators";
import AdminReports from "./pages/AdminPanel/Reports/Reports";

import AdminProtectedRoute from "./routes/AdminProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/Purple-Wheels" replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/create-password" element={<CreatePassword />} />
                <Route path="/Purple-Wheels" element={<LandingPage />} />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/MP-LifeStyle"
                    element={
                        <ProtectedRoute>
                            <MpLifeStyle />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="post-detail/:id" element={<PostDetail />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="creators" element={<Creators />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="saved-post" element={<SavedPost />} />
                </Route>

                {/* Admin Panel — separate layout, no backend auth required for demo */}
                {/* Admin Panel — protected routes */}
                <Route
                    path="/admin"
                    element={
                        <AdminProtectedRoute>
                            <AdminPanel />
                        </AdminProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="blogs" element={<AdminBlogs />} />
                    <Route path="comments" element={<AdminComments />} />
                    <Route path="creators" element={<AdminCreators />} />
                    <Route path="reports" element={<AdminReports />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;