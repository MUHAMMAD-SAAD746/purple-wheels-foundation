import { useEffect } from "react";
import { IoCloseOutline, IoWarningOutline } from "react-icons/io5";
import "./AdminModal.css";

// General purpose modal
export const AdminModal = ({ isOpen, onClose, title, children, size = "md" }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div
                className={`admin-modal admin-modal--${size}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="admin-modal-header">
                    <h3 className="admin-modal-title">{title}</h3>
                    <button className="admin-modal-close" onClick={onClose} aria-label="Close modal">
                        <IoCloseOutline />
                    </button>
                </div>
                <div className="admin-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Confirm / Delete modal
export const AdminConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirm", danger = false }) => {
    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div
                className="admin-modal admin-modal--sm"
                onClick={(e) => e.stopPropagation()}
                role="alertdialog"
                aria-modal="true"
            >
                <div className="admin-modal-header">
                    <h3 className="admin-modal-title">{title}</h3>
                    <button className="admin-modal-close" onClick={onClose} aria-label="Close modal">
                        <IoCloseOutline />
                    </button>
                </div>
                <div className="admin-modal-body">
                    <div className="admin-confirm-modal-content">
                        {danger && (
                            <div className="admin-confirm-icon-wrap">
                                <IoWarningOutline className="admin-confirm-icon" />
                            </div>
                        )}
                        <p className="admin-confirm-message">{message}</p>
                    </div>
                    <div className="admin-confirm-actions">
                        <button className="admin-btn admin-btn--ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className={`admin-btn ${danger ? "admin-btn--danger" : "admin-btn--primary"}`}
                            onClick={() => { onConfirm(); onClose(); }}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
