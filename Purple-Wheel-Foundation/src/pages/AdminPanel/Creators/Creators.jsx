import { useState, useMemo } from "react";
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
import { adminCreators } from "../../../utils/AdminPanel/adminMockData";

import "../AdminPanel.css";
import "./Creators.css";

const PAGE_SIZE = 8;

const Creators = () => {
    const [creators, setCreators] = useState(adminCreators);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewCreator, setViewCreator] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = useMemo(() => {
        return creators.filter((c) => {
            const q = search.toLowerCase();
            const matchesSearch =
                c.username.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q);
            const matchesStatus = statusFilter === "all" || c.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [creators, search, statusFilter]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleFilterChange = (setter) => (val) => {
        setter(val);
        setCurrentPage(1);
    };

    const toggleStatus = (id) => {
        setCreators((prev) =>
            prev.map((c) =>
                c.id === id
                    ? { ...c, status: c.status === "active" ? "inactive" : "active" }
                    : c
            )
        );
    };

    const deleteCreator = (id) => {
        setCreators((prev) => prev.filter((c) => c.id !== id));
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
                        onClick={() => toggleStatus(row.id)}
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
                subtitle={`${filtered.length} creator${filtered.length !== 1 ? "s" : ""} found`}
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

                <AdminTable
                    columns={columns}
                    data={paginated}
                    emptyMessage="No creators match your search."
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
