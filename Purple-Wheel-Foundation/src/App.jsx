import { BrowserRouter, Routes, Route } from "react-router-dom";

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

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/Verification" element={<Verification />} />
                <Route path="/create-password" element={<CreatePassword />} />
                <Route path="/choose-account" element={<ChooseAcc />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;