import { FaLink, FaTimes, FaCopy } from "react-icons/fa";
import { showToast } from "../../../utils/toast";
import "./SharePostModal.css";

const SharePostModal = ({ blogUrl, onClose }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(blogUrl);
            showToast("Link copied successfully!");
        } catch (error) {
            showToast("Failed to copy link.", "error");
        }
    };

    return (
        <div className="share-modal-overlay" onClick={onClose}>
            <div
                className="share-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="share-modal-header">
                    <h3>Share Post</h3>

                    <button
                        className="share-modal-close"
                        onClick={onClose}
                        aria-label="Close share modal"
                    >
                        <FaTimes />
                    </button>
                </div>

                <p className="share-modal-description">
                    Share this post with your friends.
                </p>

                <div className="share-link-container">
                    <FaLink className="share-link-icon" />

                    <input
                        type="text"
                        value={blogUrl}
                        readOnly
                        aria-label="Blog link"
                    />

                    <button
                        className="share-copy-button"
                        onClick={handleCopy}
                        aria-label="Copy blog link"
                    >
                        <FaCopy />
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SharePostModal;