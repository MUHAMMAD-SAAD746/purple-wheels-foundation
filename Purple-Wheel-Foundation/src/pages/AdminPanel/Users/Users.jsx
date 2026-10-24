import { useState, useEffect } from "react";
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
// import { adminUsers } from "../../../utils/AdminPanel/adminMockData";

import { showToast } from "../../../utils/toast";

import "../AdminPanel.css";
import "./Users.css";



const Users = () => {
    const PAGE_SIZE = 8;

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [viewUser, setViewUser] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [deletingUserId, setDeletingUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    "http://localhost:3000/api/admin/users",
                    {
                        params: {
                            search,
                            role: roleFilter,
                            status: statusFilter,
                            page: currentPage,
                            limit: PAGE_SIZE,
                        },
                        withCredentials: true,
                    }
                );


                const { users, pagination } = response.data;

                setUsers(users);
                setTotalUsers(pagination.totalUsers);
                setTotalPages(pagination.totalPages);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch users."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [search, roleFilter, statusFilter, currentPage]);


    const handlePageChange = (p) => {
        setCurrentPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFilterChange = (setter) => (val) => {
        setter(val);
        setCurrentPage(1);
    };





    const toggleStatus = async (id) => {
        const user = users.find((user) => user.id === id);

        if (!user) return;

        try {
            setUpdatingUserId(id);
            setError("");

            const newStatus = user.status === "active" ? "inactive" : "active";

            const response = await axios.patch(
                `http://localhost:3000/api/admin/users/${id}/status`,
                { status: newStatus },
                { withCredentials: true }
            );

            const updatedUser = response.data.user;

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === id
                        ? { ...user, status: updatedUser.status }
                        : user
                )
            );

            if (viewUser?.id === id) {
                setViewUser((prev) => ({
                    ...prev,
                    status: updatedUser.status,
                }));
            }
        } catch (error) {
            showToast(
                error.response?.data?.message ||
                "Failed to update user status.",
                "error"
            );
        } finally {
            setUpdatingUserId(null);
        }
    };






    const deleteUser = async (id) => {
        if (!id) return;

        try {
            setDeletingUserId(id);
            setError("");

            await axios.delete(
                `http://localhost:3000/api/admin/users/${id}`,
                { withCredentials: true }
            );

            setUsers((prev) => prev.filter((user) => user.id !== id));
            setTotalUsers((prev) => prev - 1);

            setDeleteTarget(null);

            if (viewUser?.id === id) {
                setViewUser(null);
            }

            showToast("User deleted successfully.", "success");
        } catch (error) {
            showToast(
                error.response?.data?.message || "Failed to delete user.",
                "error"
            );
        } finally {
            setDeletingUserId(null);
        }
    };





    const columns = [
        {
            key: "username",
            label: "User",
            render: (_, row) => (
                <div className="admin-user-cell">
                    <img
                        src={
                            row.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                row.username
                            )}&background=e8f1ff&color=1e90ff`
                        }
                        alt={row.username}
                        className="admin-user-avatar"
                    />
                    <div className="admin-user-info">
                        <p className="admin-user-name">{row.username}</p>
                        <p className="admin-user-email">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "role",
            label: "Role",
            render: (val) => <AdminStatusBadge status={val} />,
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
                        onClick={() => setViewUser(row)}
                    >
                        <IoEyeOutline />
                    </button>


                    <button
                        className={`admin-action-btn ${row.status === "active"
                            ? "admin-action-btn--danger"
                            : "admin-action-btn--success"
                            }`}
                        title={row.status === "active" ? "Deactivate" : "Activate"}
                        onClick={() => toggleStatus(row.id)}
                        disabled={updatingUserId === row.id}
                    >
                        {row.status === "active"
                            ? <IoBanOutline />
                            : <IoCheckmarkCircleOutline />
                        }
                    </button>


                    <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete user"
                        onClick={() => setDeleteTarget(row)}
                    >
                        <IoTrashOutline />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="admin-users-page">
            <AdminPageHeader
                title="Users Management"
                subtitle={`${totalUsers} user${totalUsers !== 1 ? "s" : ""} found`}
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
                        value={roleFilter}
                        onChange={(e) => handleFilterChange(setRoleFilter)(e.target.value)}
                        aria-label="Filter by role"
                    >
                        <option value="all">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
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
                    <p className="admin-table-message">Loading users...</p>
                ) : error ? (
                    <p className="admin-table-message">{error}</p>
                ) : (
                    <AdminTable
                        columns={columns}
                        data={users}
                        emptyMessage="No users match your search."
                    />
                )}

                <div className="admin-table-footer">
                    <span className="admin-table-count">
                        Showing{" "}
                        {totalUsers === 0
                            ? 0
                            : (currentPage - 1) * PAGE_SIZE + 1}
                        –
                        {Math.min(currentPage * PAGE_SIZE, totalUsers)} of {totalUsers}
                    </span>
                    <AdminPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* View User Modal */}
            <AdminModal
                isOpen={!!viewUser}
                onClose={() => setViewUser(null)}
                title="User Details"
                size="sm"
            >
                {viewUser && (
                    <div className="admin-user-detail">
                        <div className="admin-user-detail-avatar">
                            <img src={viewUser.avatar} alt={viewUser.username} />
                        </div>
                        <div className="admin-user-detail-info">
                            <p><strong>Username:</strong> {viewUser.username}</p>
                            <p><strong>Email:</strong> {viewUser.email}</p>
                            <p><strong>Role:</strong> <AdminStatusBadge status={viewUser.role} /></p>
                            <p><strong>Status:</strong> <AdminStatusBadge status={viewUser.status} /></p>
                            <p><strong>Joined:</strong> {viewUser.joined}</p>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Confirm Modal */}
            <AdminConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => deleteUser(deleteTarget?.id)}
                title="Delete User"
                message={`Are you sure you want to delete "${deleteTarget?.username}"? This action cannot be undone.`}
                confirmLabel="Delete"
                danger
            />
        </div>
    );
};

export default Users;
