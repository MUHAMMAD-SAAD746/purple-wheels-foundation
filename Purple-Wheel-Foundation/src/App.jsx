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
                </Route>

                <Route
                    path="/choose-account"
                    element={
                        <ProtectedRoute>
                            <ChooseAcc />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;