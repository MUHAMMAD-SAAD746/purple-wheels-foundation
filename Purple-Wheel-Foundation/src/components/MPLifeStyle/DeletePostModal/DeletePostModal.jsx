import "./DeletePostModal.css";

const DeletePostModal = ({
    isOpen,
    postTitle,
    isDeleting,
    error,
    onCancel,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="delete-modal-overlay"
            onClick={isDeleting ? undefined : onCancel}
        >
            <div
                className="delete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="delete-modal-icon">
                    <span aria-hidden="true">!</span>
                </div>

                <h2 id="delete-modal-title">Delete post?</h2>

                <p className="delete-modal-message">
                    Are you sure you want to delete{" "}
                    <strong>{postTitle || "this post"}</strong>?
                    This action cannot be undone.
                </p>

                {error && (
                    <p className="delete-modal-error" role="alert">
                        {error}
                    </p>
                )}

                <div className="delete-modal-actions">
                    <button
                        type="button"
                        className="delete-modal-cancel"
                        onClick={onCancel}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="delete-modal-confirm"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Post"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePostModal;