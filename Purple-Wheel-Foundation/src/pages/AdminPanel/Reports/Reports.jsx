import {
    IoPeopleOutline,
    IoDocumentTextOutline,
    IoChatbubblesOutline,
    IoStarOutline,
} from "react-icons/io5";

import AdminPageHeader from "../../../components/AdminPanel/AdminPageHeader/AdminPageHeader";
import {
    adminStats,
    adminMonthlyData,
    adminCategoryData,
} from "../../../utils/AdminPanel/adminMockData";

import "../AdminPanel.css";
import "./Reports.css";

const MAX_MONTHLY_USERS = Math.max(...adminMonthlyData.map((d) => d.users));
const MAX_MONTHLY_BLOGS = Math.max(...adminMonthlyData.map((d) => d.blogs));
const MAX_CATEGORY = Math.max(...adminCategoryData.map((d) => d.count));

const Reports = () => {
    return (
        <div className="admin-reports-page">
            <AdminPageHeader
                title="Reports"
                subtitle="Frontend demonstration — all data is sample data"
            />

            {/* Summary Stats */}
            <div className="admin-reports-summary">
                <div className="admin-reports-stat-card admin-reports-stat-card--blue">
                    <IoPeopleOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Users</p>
                        <h3 className="admin-reports-stat-value">{adminStats.totalUsers.toLocaleString()}</h3>
                        <p className="admin-reports-stat-growth">+{adminStats.userGrowth}% this month</p>
                    </div>
                </div>
                <div className="admin-reports-stat-card admin-reports-stat-card--green">
                    <IoDocumentTextOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Blogs</p>
                        <h3 className="admin-reports-stat-value">{adminStats.totalBlogs.toLocaleString()}</h3>
                        <p className="admin-reports-stat-growth">+{adminStats.blogGrowth}% this month</p>
                    </div>
                </div>
                <div className="admin-reports-stat-card admin-reports-stat-card--orange">
                    <IoChatbubblesOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Comments</p>
                        <h3 className="admin-reports-stat-value">{adminStats.totalComments.toLocaleString()}</h3>
                        <p className="admin-reports-stat-growth">+{adminStats.commentGrowth}% this month</p>
                    </div>
                </div>
                <div className="admin-reports-stat-card admin-reports-stat-card--purple">
                    <IoStarOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Creators</p>
                        <h3 className="admin-reports-stat-value">{adminStats.totalCreators.toLocaleString()}</h3>
                        <p className="admin-reports-stat-growth">+{adminStats.creatorGrowth}% this month</p>
                    </div>
                </div>
            </div>

            {/* Charts row */}
            <div className="admin-reports-charts">

                {/* User Growth Chart */}
                <div className="admin-section-card admin-reports-chart-card">
                    <h3 className="admin-reports-chart-title">User Growth</h3>
                    <p className="admin-reports-chart-subtitle">Monthly new users (Apr – Oct)</p>
                    <div className="admin-reports-bar-chart">
                        {adminMonthlyData.map((d) => (
                            <div key={d.month} className="admin-reports-bar-col">
                                <span className="admin-reports-bar-val">{d.users}</span>
                                <div className="admin-reports-bar-wrap">
                                    <div
                                        className="admin-reports-bar admin-reports-bar--blue"
                                        style={{ height: `${Math.round((d.users / MAX_MONTHLY_USERS) * 100)}%` }}
                                    />
                                </div>
                                <span className="admin-reports-bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blog Activity Chart */}
                <div className="admin-section-card admin-reports-chart-card">
                    <h3 className="admin-reports-chart-title">Blog Activity</h3>
                    <p className="admin-reports-chart-subtitle">Monthly blog posts published</p>
                    <div className="admin-reports-bar-chart">
                        {adminMonthlyData.map((d) => (
                            <div key={d.month} className="admin-reports-bar-col">
                                <span className="admin-reports-bar-val">{d.blogs}</span>
                                <div className="admin-reports-bar-wrap">
                                    <div
                                        className="admin-reports-bar admin-reports-bar--green"
                                        style={{ height: `${Math.round((d.blogs / MAX_MONTHLY_BLOGS) * 100)}%` }}
                                    />
                                </div>
                                <span className="admin-reports-bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Content Distribution */}
            <div className="admin-section-card admin-reports-categories">
                <h3 className="admin-reports-chart-title">Content by Category</h3>
                <p className="admin-reports-chart-subtitle">Distribution of blog posts across categories</p>
                <div className="admin-reports-category-list">
                    {adminCategoryData.map((cat) => (
                        <div key={cat.name} className="admin-reports-category-row">
                            <span className="admin-reports-category-name">{cat.name}</span>
                            <div className="admin-reports-category-bar-wrap">
                                <div
                                    className="admin-reports-category-bar"
                                    style={{ width: `${Math.round((cat.count / MAX_CATEGORY) * 100)}%` }}
                                />
                            </div>
                            <span className="admin-reports-category-count">{cat.count}</span>
                            <span className="admin-reports-category-pct">{cat.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Data Table */}
            <div className="admin-section-card">
                <h3 className="admin-reports-chart-title">Monthly Summary</h3>
                <div className="admin-reports-table-scroll">
                    <table className="admin-reports-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>New Users</th>
                                <th>Blog Posts</th>
                                <th>Comments</th>
                                <th>Engagement Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminMonthlyData.map((d) => {
                                const engagementRate = ((d.comments / d.blogs) * 10).toFixed(1);
                                return (
                                    <tr key={d.month}>
                                        <td className="admin-reports-month-cell">{d.month} 2024</td>
                                        <td>{d.users}</td>
                                        <td>{d.blogs}</td>
                                        <td>{d.comments}</td>
                                        <td>
                                            <div className="admin-reports-engagement">
                                                <div
                                                    className="admin-reports-engagement-bar"
                                                    style={{ width: `${Math.min(parseFloat(engagementRate), 100)}%` }}
                                                />
                                                <span>{engagementRate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Reports;
