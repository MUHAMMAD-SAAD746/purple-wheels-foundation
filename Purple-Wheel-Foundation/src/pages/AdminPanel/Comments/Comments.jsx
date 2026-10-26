import { useState, useEffect, useCallback } from "react";
import axios from "axios";
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

import "../AdminPanel.css";
import "./Comments.css";

const PAGE_SIZE = 8;

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [totalComments, setTotalComments] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [viewComment, setViewComment] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);



    const fetchComments = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/comments`,
                {
                    params: {
                        search,
                        status: statusFilter,
                        page: currentPage,
                        limit: PAGE_SIZE,
                    },
                    withCredentials: true,
                }
            );

            const data = response.data;

            const formattedComments = data.comments.map((comment) => ({
                id: comment._id,
                content: comment.text,
                author: comment.author?.username || "Unknown",
                blogTitle: comment.blog?.title || "Unknown",
                created: comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString()
                    : "N/A",
                status: comment.status,
            }));

            setComments(formattedComments);
            setTotalComments(data.totalComments);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (err) {
            console.error("Failed to fetch comments:", err);
            setError(
                err.response?.data?.message || "Failed to load comments."
            );
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, currentPage]);


    useEffect(() => {
        fetchComments();
    }, [fetchComments]);





    const handleFilterChange = (setter) => (val) => {
        setter(val);
        setCurrentPage(1);
    };





    const changeStatus = async (id, newStatus) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/comments/${id}/status`,
                { status: newStatus },
                {
                    withCredentials: true,
                }
            );

            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === id
                        ? { ...comment, status: newStatus }
                        : comment
                )
            );

            setViewComment((prev) =>
                prev?.id === id
                    ? { ...prev, status: newStatus }
                    : prev
            );
        } catch (err) {
            console.error("Failed to update comment status:", err);

            alert(
                err.response?.data?.message ||
                "Failed to update comment status."
            );
        }
    };






    const deleteComment = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/comments/${id}`,
                {
                    withCredentials: true,
                }
            );

            setComments((prev) =>
                prev.filter((comment) => comment.id !== id)
            );

            setTotalComments((prev) => prev - 1);
            setDeleteTarget(null);

            // If the deleted comment was the only item on this page,
            // move to the previous page.
            if (comments.length === 1 && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
            }
        } catch (err) {
            console.error("Failed to delete comment:", err);

            alert(
                err.response?.data?.message || "Failed to delete comment."
            );
        }
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
                subtitle={`${totalComments} comment${totalComments !== 1 ? "s" : ""} found`}
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

                {error ? (
                    <div className="admin-table-empty">
                        {error}
                        <button className="admin-btn" onClick={fetchComments}>
                            Retry
                        </button>
                    </div>
                ) : loading ? (
                    <div className="admin-table-empty">
                        Loading comments...
                    </div>
                ) : (
                    <AdminTable
                        columns={columns}
                        data={comments}
                        emptyMessage="No comments match your search."
                    />
                )}

                <div className="admin-table-footer">
                    <span className="admin-table-count">
                        Showing{" "}
                        {totalComments === 0
                            ? 0
                            : (currentPage - 1) * PAGE_SIZE + 1}
                        –{Math.min(currentPage * PAGE_SIZE, totalComments)} of{" "}
                        {totalComments}
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
