import "./AdminPagination.css";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const AdminPagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Show max 5 page buttons
    let visiblePages = pages;
    if (totalPages > 5) {
        const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
        visiblePages = pages.slice(start - 1, start + 4);
    }

    return (
        <div className="admin-pagination">
            <button
                className="admin-pagination-btn admin-pagination-nav"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Previous page"
            >
                <IoChevronBackOutline />
            </button>

            {visiblePages[0] > 1 && (
                <>
                    <button className="admin-pagination-btn" onClick={() => onPageChange(1)}>1</button>
                    {visiblePages[0] > 2 && <span className="admin-pagination-ellipsis">…</span>}
                </>
            )}

            {visiblePages.map(page => (
                <button
                    key={page}
                    className={`admin-pagination-btn ${currentPage === page ? "admin-pagination-btn--active" : ""}`}
                    onClick={() => onPageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                >
                    {page}
                </button>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className="admin-pagination-ellipsis">…</span>
                    )}
                    <button className="admin-pagination-btn" onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className="admin-pagination-btn admin-pagination-nav"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Next page"
            >
                <IoChevronForwardOutline />
            </button>
        </div>
    );
};

export default AdminPagination;
