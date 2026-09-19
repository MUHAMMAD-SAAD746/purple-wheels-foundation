import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";

import "./auth.css";

function Verification() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();
    const input5 = useRef();
    const input6 = useRef();

    const handleChange = (e, index, nextInput) => {
        const value = e.target.value.replace(/\D/g, "");

        if (!value) return;

        setError("");

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6);

            setOtp(pastedCode);

            const inputs = [
                input1,
                input2,
                input3,
                input4,
                input5,
                input6,
            ];

            inputs[pastedCode.length - 1]?.current.focus();

            return;
        }

        const newOtp = otp.split("");
        newOtp[index] = value;

        setOtp(newOtp.join(""));

        if (nextInput) {
            nextInput.current.focus();
        }
    };



    const handleKeyDown = (e, index, previousInput) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            if (otp[index]) {
                const newOtp = otp.split("");
                newOtp[index] = "";
                setOtp(newOtp.join(""));
            } else if (previousInput) {
                previousInput.current.focus();
            }
        }
    };



    const handlePaste = (e) => {
        e.preventDefault();

        const pastedCode = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pastedCode) return;

        setError("");

        setOtp(pastedCode);

        const inputs = [
            input1,
            input2,
            input3,
            input4,
            input5,
            input6,
        ];

        inputs[pastedCode.length - 1]?.current.focus();
    };


    const handleVerify = async (e) => {
        e.preventDefault();

        setError("");

        if (otp.length !== 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        try {
            setLoading(true);
            
            const response = await axios.post(
                "http://localhost:3000/api/auth/verify-reset-code",
                {
                    email,
                    otp
                },
                {
                    withCredentials: true
                }
            );

            console.log(response.data);

            navigate("/create-password", {
                state: { email }
            });

        } catch (error) {
            setError(
                error.response?.data?.message || "Verification failed."
            );
        } finally {
            setLoading(false)
        }
    };



    return (
        <div className="auth-form-page auth-page verify">
            <AuthImagePanel />

            <div className="auth-form-container">
                <div className="auth-form-header">
                    <h1>Verification</h1>
                    <p>
                        Enter the 6-digit code that you recieved on your email.
                    </p>
                </div>

                <form className="auth-form otp-form" onSubmit={handleVerify}>

                    <div className="otp-inputs">
                        <input
                            ref={input1}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            name="otp-1"
                            value={otp[0] || ""}
                            onChange={(e) => handleChange(e, 0, input2)}
                            onKeyDown={(e) => handleKeyDown(e, 0)}
                            onPaste={handlePaste}
                        />

                        <input
                            ref={input2}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            name="otp-2"
                            value={otp[1] || ""}
                            onChange={(e) => handleChange(e, 1, input3)}
                            onKeyDown={(e) => handleKeyDown(e, 1, input1)}
                        />

                        <input
                            ref={input3}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            name="otp-3"
                            value={otp[2] || ""}
                            onChange={(e) => handleChange(e, 2, input4)}
                            onKeyDown={(e) => handleKeyDown(e, 2, input2)}
                        />

                        <input
                            ref={input4}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            name="otp-4"
                            value={otp[3] || ""}
                            onChange={(e) => handleChange(e, 3, input5)}
                            onKeyDown={(e) => handleKeyDown(e, 3, input3)}
                        />

                        <input
                            ref={input5}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            name="otp-5"
                            value={otp[4] || ""}
                            onChange={(e) => handleChange(e, 4, input6)}
                            onKeyDown={(e) => handleKeyDown(e, 4, input4)}
                        />

                        <input
                            ref={input6}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            name="otp-6"
                            value={otp[5] || ""}
                            onChange={(e) => handleChange(e, 5)}
                            onKeyDown={(e) => handleKeyDown(e, 5, input5)}
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Verifying" : "Verify"}
                    </button>

                    <p className="resend-code">
                        If you didn't receive a code! <span>Resend</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Verification;