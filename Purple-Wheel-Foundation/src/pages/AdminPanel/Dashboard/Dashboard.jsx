import { useState } from "react";
import {
    IoPeopleOutline,
    IoDocumentTextOutline,
    IoChatbubblesOutline,
    IoStarOutline,
} from "react-icons/io5";

import AdminDashboardCard from "../../../components/AdminPanel/AdminDashboardCard/AdminDashboardCard";
import AdminStatusBadge from "../../../components/AdminPanel/AdminStatusBadge/AdminStatusBadge";
import {
    adminStats,
    adminUsers,
    adminBlogs,
    adminMonthlyData,
} from "../../../utils/AdminPanel/adminMockData";

import "./Dashboard.css";

const MAX_MONTHLY = Math.max(...adminMonthlyData.map((d) => d.users));

const Dashboard = () => {
    const recentUsers = adminUsers.slice(0, 5);
    const recentBlogs = adminBlogs.slice(0, 5);

    return (
        <div className="admin-dashboard">

            {/* Stats cards */}
            <div className="admin-dashboard-cards">
                <AdminDashboardCard
                    title="Total Users"
                    value={adminStats.totalUsers}
                    icon={IoPeopleOutline}
                    trend={adminStats.userGrowth}
                    color="blue"
                />
                <AdminDashboardCard
                    title="Total Blogs"
                    value={adminStats.totalBlogs}
                    icon={IoDocumentTextOutline}
                    trend={adminStats.blogGrowth}
                    color="green"
                />
                <AdminDashboardCard
                    title="Total Comments"
                    value={adminStats.totalComments}
                    icon={IoChatbubblesOutline}
                    trend={adminStats.commentGrowth}
                    color="orange"
                />
                <AdminDashboardCard
                    title="Total Creators"
                    value={adminStats.totalCreators}
                    icon={IoStarOutline}
                    trend={adminStats.creatorGrowth}
                    color="purple"
                />
            </div>

            {/* Chart + Recent */}
            <div className="admin-dashboard-mid">

                {/* CSS Bar Chart */}
                <div className="admin-section-card admin-dashboard-chart-card">
                    <h3 className="admin-dashboard-section-title">User Growth (Monthly)</h3>
                    <div className="admin-bar-chart">
                        {adminMonthlyData.map((d) => (
                            <div key={d.month} className="admin-bar-chart-col">
                                <div className="admin-bar-chart-bar-wrap">
                                    <div
                                        className="admin-bar-chart-bar"
                                        style={{ height: `${Math.round((d.users / MAX_MONTHLY) * 100)}%` }}
                                        title={`${d.users} users`}
                                    />
                                </div>
                                <span className="admin-bar-chart-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity summary */}
                <div className="admin-section-card admin-dashboard-activity-card">
                    <h3 className="admin-dashboard-section-title">Monthly Activity</h3>
                    <div className="admin-activity-list">
                        {adminMonthlyData.slice(-3).reverse().map((d) => (
                            <div key={d.month} className="admin-activity-row">
                                <span className="admin-activity-month">{d.month}</span>
                                <div className="admin-activity-stats">
                                    <span className="admin-activity-chip admin-activity-chip--blue">{d.users} users</span>
                                    <span className="admin-activity-chip admin-activity-chip--green">{d.blogs} blogs</span>
                                    <span className="admin-activity-chip admin-activity-chip--orange">{d.comments} cmts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="admin-dashboard-divider" />
                    <div className="admin-dashboard-totals">
                        <div className="admin-dashboard-total-item">
                            <span className="admin-dashboard-total-label">This Month</span>
                            <strong className="admin-dashboard-total-value">
                                {adminMonthlyData[adminMonthlyData.length - 1].users} new users
                            </strong>
                        </div>
                        <div className="admin-dashboard-total-item">
                            <span className="admin-dashboard-total-label">New Blogs</span>
                            <strong className="admin-dashboard-total-value">
                                {adminMonthlyData[adminMonthlyData.length - 1].blogs}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Users + Recent Blogs */}
            <div className="admin-dashboard-bottom">

                {/* Recent Users */}
                <div className="admin-section-card">
                    <h3 className="admin-dashboard-section-title">Recent Users</h3>
                    <div className="admin-dashboard-table-scroll">
                        <table className="admin-dashboard-mini-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td>
                                            <div className="admin-user-cell">
                                                <img src={u.avatar} alt={u.username} className="admin-user-avatar" />
                                                <div className="admin-user-info">
                                                    <p className="admin-user-name">{u.username}</p>
                                                    <p className="admin-user-email">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td><AdminStatusBadge status={u.role} /></td>
                                        <td><AdminStatusBadge status={u.status} /></td>
                                        <td className="admin-dashboard-date">{u.joined}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Blogs */}
                <div className="admin-section-card">
                    <h3 className="admin-dashboard-section-title">Recent Blogs</h3>
                    <div className="admin-dashboard-table-scroll">
                        <table className="admin-dashboard-mini-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBlogs.map((b) => (
                                    <tr key={b.id}>
                                        <td className="admin-dashboard-blog-title">{b.title}</td>
                                        <td className="admin-dashboard-author">{b.author}</td>
                                        <td>{b.category}</td>
                                        <td><AdminStatusBadge status={b.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;
