import { useState, useMemo } from "react";
import {
    IoEyeOutline,
    IoTrashOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
} from "react-icons/io5";

import AdminTable from "../../../components/AdminPanel/AdminTable/AdminTable";
import AdminSearch from "../../../components/AdminPanel/AdminSearch/AdminSearch";
import AdminPagination from "../../../components/AdminPanel/AdminPagination/AdminPagination";
import AdminStatusBadge from "../../../components/AdminPanel/AdminStatusBadge/AdminStatusBadge";
import AdminPageHeader from "../../../components/AdminPanel/AdminPageHeader/AdminPageHeader";
import { AdminModal, AdminConfirmModal } from "../../../components/AdminPanel/AdminModal/AdminModal";
import { adminComments } from "../../../utils/AdminPanel/adminMockData";

import "../AdminPanel.css";
import "./Comments.css";

const PAGE_SIZE = 8;

const Comments = () => {
    const [comments, setComments] = useState(adminComments);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewComment, setViewComment] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = useMemo(() => {
        return comments.filter((c) => {
            const q = search.toLowerCase();
            const matchesSearch =
                c.content.toLowerCase().includes(q) ||
                c.author.toLowerCase().includes(q) ||
                c.blogTitle.toLowerCase().includes(q);
            const matchesStatus = statusFilter === "all" || c.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [comments, search, statusFilter]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleFilterChange = (setter) => (val) => {
        setter(val);
        setCurrentPage(1);
    };

    const changeStatus = (id, newStatus) => {
        setComments((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
    };

    const deleteComment = (id) => {
        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    const columns = [
        {
            key: "content",
            label: "Comment",
            render: (val) => (
                <span className="admin-comments-content">{val}</span>
            ),
        },
        {
            key: "author",
            label: "Author",
            render: (val) => <span className="admin-table-muted">{val}</span>,
        },
        {
            key: "blogTitle",
            label: "Blog",
            render: (val) => <span className="admin-comments-blog">{val}</span>,
        },
        {
            key: "created",
            label: "Date",
            render: (val) => <span className="admin-table-muted">{val}</span>,
        },
        {
            key: "status",
            label: "Status",
            render: (val) => <AdminStatusBadge status={val} />,
        },
        {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
                <div className="admin-action-group">
                    <button
                        className="admin-action-btn"
                        title="View full comment"
                        onClick={() => setViewComment(row)}
                    >
                        <IoEyeOutline />
                    </button>
                    {row.status !== "approved" && (
                        <button
                            className="admin-action-btn admin-action-btn--success"
                            title="Approve"
                            onClick={() => changeStatus(row.id, "approved")}
                        >
                            <IoCheckmarkCircleOutline />
                        </button>
                    )}
                    {row.status !== "rejected" && (
                        <button
                            className="admin-action-btn admin-action-btn--danger"
                            title="Reject"
                            onClick={() => changeStatus(row.id, "rejected")}
                        >
                            <IoCloseCircleOutline />
                        </button>
                    )}
                    <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                        onClick={() => setDeleteTarget(row)}
                    >
                        <IoTrashOutline />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-comments-page">
            <AdminPageHeader
                title="Comments Management"
                subtitle={`${filtered.length} comment${filtered.length !== 1 ? "s" : ""} found`}
            />

            <div className="admin-section-card">
                <div className="admin-filter-bar">
                    <AdminSearch
                        value={search}
                        onChange={handleFilterChange(setSearch)}
                        placeholder="Search comments, authors, blogs..."
                    />
                    <select
                        className="admin-filter-select"
                        value={statusFilter}
                        onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
                        aria-label="Filter by status"
                    >
                        <option value="all">All Statuses</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <AdminTable
                    columns={columns}
                    data={paginated}
                    emptyMessage="No comments match your search."
                />

                <div className="admin-table-footer">
                    <span className="admin-table-count">
                        Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–
                        {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
                    </span>
                    <AdminPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* View Comment Modal */}
            <AdminModal
                isOpen={!!viewComment}
                onClose={() => setViewComment(null)}
                title="Comment Details"
                size="sm"
            >
                {viewComment && (
                    <div className="admin-comment-detail">
                        <div className="admin-comment-detail-body">
                            <p className="admin-comment-detail-content">"{viewComment.content}"</p>
                        </div>
                        <div className="admin-comment-detail-meta">
                            <div className="admin-comment-detail-row">
                                <span className="admin-comment-detail-label">Author</span>
                                <span>{viewComment.author}</span>
                            </div>
                            <div className="admin-comment-detail-row">
                                <span className="admin-comment-detail-label">Blog</span>
                                <span>{viewComment.blogTitle}</span>
                            </div>
                            <div className="admin-comment-detail-row">
                                <span className="admin-comment-detail-label">Date</span>
                                <span>{viewComment.created}</span>
                            </div>
                            <div className="admin-comment-detail-row">
                                <span className="admin-comment-detail-label">Status</span>
                                <AdminStatusBadge status={viewComment.status} />
                            </div>
                        </div>
                        <div className="admin-comment-detail-actions">
                            {viewComment.status !== "approved" && (
                                <button
                                    className="admin-btn admin-btn--success"
                                    onClick={() => { changeStatus(viewComment.id, "approved"); setViewComment(null); }}
                                >
                                    Approve
                                </button>
                            )}
                            {viewComment.status !== "rejected" && (
                                <button
                                    className="admin-btn admin-btn--danger"
                                    onClick={() => { changeStatus(viewComment.id, "rejected"); setViewComment(null); }}
                                >
                                    Reject
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Confirm */}
            <AdminConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => deleteComment(deleteTarget?.id)}
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                confirmLabel="Delete"
                danger
            />
        </div>
    );
};

export default Comments;
