import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./AuthInput.css";
import { useState } from "react";

function AuthInput({
    id,
    name,
    label,
    type = "text",
    placeholder,
    icon,
    value,
    onChange,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password" && showPassword ? "text" : type;

    return (
        <div className="auth-input-group">

            <label htmlFor={id}>{label}</label>

            <div className="auth-input-wrapper">

                {icon && (
                    <span className="auth-input-icon">
                        {icon}
                    </span>
                )}

                <input
                    id={id}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {type === "password" && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}

            </div>

        </div>
    );
}

export default AuthInput;