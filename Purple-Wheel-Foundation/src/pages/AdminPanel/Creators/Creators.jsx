import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    IoEyeOutline,
    IoTrashOutline,
    IoCheckmarkCircleOutline,
    IoBanOutline,
} from "react-icons/io5";

import AdminTable from "../../../components/AdminPanel/AdminTable/AdminTable";
import AdminSearch from "../../../components/AdminPanel/AdminSearch/AdminSearch";
import AdminPagination from "../../../components/AdminPanel/AdminPagination/AdminPagination";
import AdminStatusBadge from "../../../components/AdminPanel/AdminStatusBadge/AdminStatusBadge";
import AdminPageHeader from "../../../components/AdminPanel/AdminPageHeader/AdminPageHeader";
import { AdminModal, AdminConfirmModal } from "../../../components/AdminPanel/AdminModal/AdminModal";
// import { adminCreators } from "../../../utils/AdminPanel/adminMockData";

import "../AdminPanel.css";
import "./Creators.css";


const Creators = () => {
    const [creators, setCreators] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCreators, setTotalCreators] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [viewCreator, setViewCreator] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const PAGE_SIZE = 8;

    const fetchCreators = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/creators`,
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

            setCreators(response.data.creators);
            setTotalCreators(response.data.pagination.totalCreators);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("Fetch creators error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch creators."
            );
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, currentPage]);

    useEffect(() => {
        fetchCreators();
    }, [fetchCreators]);

    const handleFilterChange = (setter) => (value) => {
        setter(value);
        setCurrentPage(1);
    };





    const toggleStatus = async (creator) => {
        const newStatus =
            creator.status === "active" ? "inactive" : "active";

        try {
            setError("");

            await axios.patch(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/users/${creator.id}/status`,
                { status: newStatus },
                { withCredentials: true }
            );

            // Update the creator immediately without refetching
            setCreators((prev) =>
                statusFilter !== "all" && statusFilter !== newStatus
                    ? prev.filter((c) => c.id !== creator.id)
                    : prev.map((c) =>
                        c.id === creator.id
                            ? { ...c, status: newStatus }
                            : c
                    )
            );

            // Update the total when the creator no longer matches the filter
            if (statusFilter !== "all" && statusFilter !== newStatus) {
                setTotalCreators((prev) => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error("Update creator status error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update creator status."
            );
        }
    };




    const deleteCreator = async (id) => {
        if (!id) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/users/${id}`,
                { withCredentials: true }
            );

            setDeleteTarget(null);

            // Fetch updated data from the backend
            await fetchCreators();
        } catch (error) {
            console.error("Delete creator error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete creator."
            );
        }
    };




    const columns = [
        {
            key: "username",
            label: "Creator",
            render: (_, row) => (
                <div className="admin-user-cell">
                    <img src={row.avatar} alt={row.username} className="admin-user-avatar" />
                    <div className="admin-user-info">
                        <p className="admin-user-name">{row.username}</p>
                        <p className="admin-user-email">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "posts",
            label: "Posts",
            render: (val) => <span className="admin-table-muted">{val}</span>,
        },
        {
            key: "followers",
            label: "Followers",
            render: (val) => <span className="admin-table-muted">{val.toLocaleString()}</span>,
        },
        {
            key: "status",
            label: "Status",
            render: (val) => <AdminStatusBadge status={val} />,
        },
        {
            key: "joined",
            label: "Joined",
            render: (val) => <span className="admin-table-muted">{val}</span>,
        },
        {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
                <div className="admin-action-group">
                    <button
                        className="admin-action-btn"
                        title="View details"
                        onClick={() => setViewCreator(row)}
                    >
                        <IoEyeOutline />
                    </button>
                    <button
                        className={`admin-action-btn ${row.status === "active" ? "admin-action-btn--danger" : "admin-action-btn--success"}`}
                        title={row.status === "active" ? "Deactivate" : "Activate"}
                        onClick={() => toggleStatus(row)}
                    >
                        {row.status === "active" ? <IoBanOutline /> : <IoCheckmarkCircleOutline />}
                    </button>
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
        <div className="admin-creators-page">
            <AdminPageHeader
                title="Creators Management"
                subtitle={`${totalCreators} creator${totalCreators !== 1 ? "s" : ""} found`}
            />

            <div className="admin-section-card">
                <div className="admin-filter-bar">
                    <AdminSearch
                        value={search}
                        onChange={handleFilterChange(setSearch)}
                        placeholder="Search by name or email..."
                    />
                    <select
                        className="admin-filter-select"
                        value={statusFilter}
                        onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
                        aria-label="Filter by status"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {loading ? (
                    <p className="admin-table-muted">Loading creators...</p>
                ) : error ? (
                    <p className="admin-table-muted">{error}</p>
                ) : (
                    <AdminTable
                        columns={columns}
                        data={creators}
                        emptyMessage="No creators match your search."
                    />
                )}

                <div className="admin-table-footer">
                    <span className="admin-table-count">
                        Showing{" "}
                        {totalCreators === 0
                            ? 0
                            : (currentPage - 1) * PAGE_SIZE + 1}
                        –
                        {Math.min(currentPage * PAGE_SIZE, totalCreators)} of{" "}
                        {totalCreators}
                    </span>

                    <AdminPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* View Creator Modal */}
            <AdminModal
                isOpen={!!viewCreator}
                onClose={() => setViewCreator(null)}
                title="Creator Details"
                size="sm"
            >
                {viewCreator && (
                    <div className="admin-creator-detail">
                        <div className="admin-creator-detail-avatar">
                            <img src={viewCreator.avatar} alt={viewCreator.username} />
                        </div>
                        <div className="admin-creator-detail-stats">
                            <div className="admin-creator-stat">
                                <span className="admin-creator-stat-value">{viewCreator.posts}</span>
                                <span className="admin-creator-stat-label">Posts</span>
                            </div>
                            <div className="admin-creator-stat">
                                <span className="admin-creator-stat-value">{viewCreator.followers.toLocaleString()}</span>
                                <span className="admin-creator-stat-label">Followers</span>
                            </div>
                        </div>
                        <div className="admin-creator-detail-info">
                            <p><strong>Username:</strong> {viewCreator.username}</p>
                            <p><strong>Email:</strong> {viewCreator.email}</p>
                            <p><strong>Status:</strong> <AdminStatusBadge status={viewCreator.status} /></p>
                            <p><strong>Joined:</strong> {viewCreator.joined}</p>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Confirm */}
            <AdminConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => deleteCreator(deleteTarget?.id)}
                title="Delete Creator"
                message={`Are you sure you want to delete "${deleteTarget?.username}"? This action cannot be undone.`}
                confirmLabel="Delete"
                danger
            />
        </div>
    );
};

export default Creators;
