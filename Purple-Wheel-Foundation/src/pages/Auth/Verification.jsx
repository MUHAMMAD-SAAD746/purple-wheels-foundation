import { useState, useRef } from "react";
import AuthImagePanel from "../../components/Auth/AuthImagePanel/AuthImagePanel";

import "./auth.css";

function Verification() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();
    const input5 = useRef();
    const input6 = useRef();

    const handleChange = (e, index, nextInput) => {
        const value = e.target.value;

        if (!/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (nextInput) {
            nextInput.current.focus();
        }
    };



    const handleKeyDown = (e, index, previousInput) => {

        if (e.key === "Backspace") {

            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
            else if (previousInput) {
                previousInput.current.focus();
            }
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

                <form className="auth-form otp-form">

                    <div className="otp-inputs">
                        <input
                            ref={input1}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, 0, input2)}
                            onKeyDown={(e) => handleKeyDown(e, 0)}
                        />

                        <input
                            ref={input2}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, 1, input3)}
                            onKeyDown={(e) => handleKeyDown(e, 1, input1)}
                        />

                        <input
                            ref={input3}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, 2, input4)}
                            onKeyDown={(e) => handleKeyDown(e, 2, input2)}
                        />

                        <input
                            ref={input4}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, 3, input5)}
                            onKeyDown={(e) => handleKeyDown(e, 3, input3)}
                        />

                        <input
                            ref={input5}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, 4, input6)}
                            onKeyDown={(e) => handleKeyDown(e, 4, input4)}
                        />

                        <input
                            ref={input6}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, 5)}
                            onKeyDown={(e) => handleKeyDown(e, 5, input5)}
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Verify
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