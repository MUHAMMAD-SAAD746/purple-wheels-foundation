import "./AdminDashboardCard.css";

const AdminDashboardCard = ({ title, value, icon: Icon, trend, trendLabel, color }) => {
    const isPositive = trend >= 0;

    return (
        <div className={`admin-dash-card admin-dash-card--${color}`}>
            <div className="admin-dash-card-top">
                <div className="admin-dash-card-info">
                    <p className="admin-dash-card-title">{title}</p>
                    <h2 className="admin-dash-card-value">{value.toLocaleString()}</h2>
                </div>
                <div className={`admin-dash-card-icon-wrap admin-dash-card-icon-wrap--${color}`}>
                    <Icon className="admin-dash-card-icon" />
                </div>
            </div>
            {trend !== undefined && (
                <div className="admin-dash-card-trend">
                    <span className={`admin-dash-card-trend-badge ${isPositive ? "admin-dash-card-trend-badge--up" : "admin-dash-card-trend-badge--down"}`}>
                        {isPositive ? "↑" : "↓"} {Math.abs(trend)}%
                    </span>
                    <span className="admin-dash-card-trend-label">{trendLabel || "vs last month"}</span>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardCard;
