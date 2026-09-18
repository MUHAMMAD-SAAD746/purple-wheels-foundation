import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verification from "./pages/Auth/Verification";
import CreatePassword from "./pages/Auth/CreatePassword";
import ChooseAcc from "./pages/Auth/ChooseYourAcc/ChooseAcc";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/Verification" element={<Verification />} />
                <Route path="/create-password" element={<CreatePassword />} />

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