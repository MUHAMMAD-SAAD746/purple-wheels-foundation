import "./AdminStatusBadge.css";

const statusConfig = {
    active:   { label: "Active",   className: "admin-badge--active" },
    inactive: { label: "Inactive", className: "admin-badge--inactive" },
    approved: { label: "Approved", className: "admin-badge--approved" },
    pending:  { label: "Pending",  className: "admin-badge--pending" },
    rejected: { label: "Rejected", className: "admin-badge--rejected" },
    user:     { label: "User",     className: "admin-badge--user" },
    creator:  { label: "Creator",  className: "admin-badge--creator" },
};

const AdminStatusBadge = ({ status }) => {
    const config = statusConfig[status] || { label: status, className: "" };
    return (
        <span className={`admin-status-badge ${config.className}`}>
            {config.label}
        </span>
    );
};

export default AdminStatusBadge;
