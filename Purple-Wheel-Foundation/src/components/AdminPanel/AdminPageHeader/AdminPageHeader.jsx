import "./AdminPageHeader.css";

const AdminPageHeader = ({ title, subtitle, actions }) => {
    return (
        <div className="admin-page-header">
            <div className="admin-page-header-info">
                <h2 className="admin-page-header-title">{title}</h2>
                {subtitle && <p className="admin-page-header-subtitle">{subtitle}</p>}
            </div>
            {actions && (
                <div className="admin-page-header-actions">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default AdminPageHeader;
