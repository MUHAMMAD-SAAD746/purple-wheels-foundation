import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const showToast = (
    message,
    type = "success",
    duration = 2000
) => {
    const backgroundColor =
        type === "success"
            ? "#16a34a"
            : type === "error"
            ? "#dc2626"
            : type === "warning"
            ? "#f59e0b"
            : "#187bdb";

    Toastify({
        text: message,
        duration,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: backgroundColor,
            borderRadius: "8px",
            fontSize: "14px",
        },
    }).showToast();
};