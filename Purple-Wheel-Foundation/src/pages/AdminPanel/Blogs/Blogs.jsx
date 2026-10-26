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
import "./Blogs.css";

const PAGE_SIZE = 8;

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewBlog, setViewBlog] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const categories = [
        "wellness",
        "fashion",
        "travel",
        "motivation",
        "food",
    ];



    const handleFilterChange = (setter) => (val) => {
        setter(val);
        setCurrentPage(1);
    };

    const changeStatus = (id, newStatus) => {
        setBlogs((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
    };




    const deleteBlog = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/admin/blogs/${id}`,
                {
                    withCredentials: true,
                }
            );

            setDeleteTarget(null);

            // Handle deleting the last blog on the current page
            if (blogs.length === 1 && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
            } else {
                fetchBlogs();
            }
        } catch (err) {
            console.error("Failed to delete blog:", err);

            setError(
                err.response?.data?.message || "Failed to delete blog."
            );
        }
    };




    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/blogs",
                {
                    params: {
                        search: search.trim(),
                        category: categoryFilter,
                        status: statusFilter,
                        page: currentPage,
                        limit: PAGE_SIZE,
                    },
                    withCredentials: true,
                }
            );

            const data = response.data;

            setBlogs(data.blogs || []);

            const pagination = data.pagination || data;

            setTotalBlogs(
                pagination.totalBlogs ?? pagination.total ?? 0
            );

            setTotalPages(pagination.totalPages ?? 1);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load blogs."
            );

            setBlogs([]);
            setTotalBlogs(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [search, categoryFilter, statusFilter, currentPage]);



    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);





    const columns = [
        {
            key: "title",
            label: "Title",
            render: (val) => (
                <span className="admin-blogs-title">{val}</span>
            ),
        },
        {
            key: "author",
            label: "Author",
            render: (val) => <span className="admin-table-muted">{val}</span>,
        },
        {
            key: "category",
            label: "Category",
            render: (val) => (
                <span className="admin-blogs-category">{val}</span>
            ),
        },
        {
            key: "views",
            label: "Views",
            render: (val) => <span className="admin-table-muted">{val.toLocaleString()}</span>,
        },
        {
            key: "status",
            label: "Status",
            render: (val) => <AdminStatusBadge status={val} />,
        },
        {
            key: "created",
            label: "Date",
            render: (val) => <span className="admin-table-muted">{val}</span>,
        },
        {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
                <div className="admin-action-group">
                    <button
                        className="admin-action-btn"
                        title="View"
                        onClick={() => setViewBlog(row)}
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
        <div className="admin-blogs-page">
            <AdminPageHeader
                title="Blogs Management"
                subtitle={`${totalBlogs} blog${totalBlogs !== 1 ? "s" : ""} found`}
            />

            <div className="admin-section-card">
                <div className="admin-filter-bar">
                    <AdminSearch
                        value={search}
                        onChange={handleFilterChange(setSearch)}
                        placeholder="Search by title or author..."
                    />
                    <select
                        className="admin-filter-select"
                        value={categoryFilter}
                        onChange={(e) => handleFilterChange(setCategoryFilter)(e.target.value)}
                        aria-label="Filter by category"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
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

                {error && <p role="alert">{error}</p>}

                {loading ? (
                    <p>Loading blogs...</p>
                ) : (
                    <AdminTable
                        columns={columns}
                        data={blogs}
                        emptyMessage="No blogs match your search."
                    />
                )}

                <div className="admin-table-footer">
                    <span className="admin-table-count">
                        Showing{" "}
                        {totalBlogs === 0
                            ? 0
                            : (currentPage - 1) * PAGE_SIZE + 1}
                        –
                        {Math.min(currentPage * PAGE_SIZE, totalBlogs)} of {totalBlogs}
                    </span>
                    <AdminPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* View Blog Modal */}
            <AdminModal
                isOpen={!!viewBlog}
                onClose={() => setViewBlog(null)}
                title="Blog Details"
                size="md"
            >
                {viewBlog && (
                    <div className="admin-blog-detail">
                        <p className="admin-blog-detail-title">{viewBlog.title}</p>
                        <div className="admin-blog-detail-grid">
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Author</span>
                                <span className="admin-blog-detail-value">{viewBlog.author}</span>
                            </div>
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Category</span>
                                <span className="admin-blog-detail-value">{viewBlog.category}</span>
                            </div>
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Status</span>
                                <AdminStatusBadge status={viewBlog.status} />
                            </div>
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Views</span>
                                <span className="admin-blog-detail-value">{viewBlog.views.toLocaleString()}</span>
                            </div>
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Likes</span>
                                <span className="admin-blog-detail-value">{viewBlog.likes}</span>
                            </div>
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Comments</span>
                                <span className="admin-blog-detail-value">{viewBlog.comments}</span>
                            </div>
                            <div className="admin-blog-detail-row">
                                <span className="admin-blog-detail-label">Created</span>
                                <span className="admin-blog-detail-value">{viewBlog.created}</span>
                            </div>
                        </div>
                        <div className="admin-blog-detail-actions">
                            {viewBlog.status !== "approved" && (
                                <button
                                    className="admin-btn admin-btn--success"
                                    onClick={() => { changeStatus(viewBlog.id, "approved"); setViewBlog(null); }}
                                >
                                    <IoCheckmarkCircleOutline /> Approve
                                </button>
                            )}
                            {viewBlog.status !== "rejected" && (
                                <button
                                    className="admin-btn admin-btn--danger"
                                    onClick={() => { changeStatus(viewBlog.id, "rejected"); setViewBlog(null); }}
                                >
                                    <IoCloseCircleOutline /> Reject
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
                onConfirm={() => deleteBlog(deleteTarget?._id || deleteTarget?.id)}
                title="Delete Blog"
                message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                confirmLabel="Delete"
                danger
            />
        </div>
    );
};

export default Blogs;
