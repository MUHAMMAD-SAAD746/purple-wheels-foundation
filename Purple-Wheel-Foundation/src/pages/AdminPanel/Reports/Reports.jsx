import { useEffect, useState } from "react";
import axios from "axios";

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

const MAX_MONTHLY_BLOGS = Math.max(...adminMonthlyData.map((d) => d.blogs));
const MAX_CATEGORY = Math.max(...adminCategoryData.map((d) => d.count));

const Reports = () => {
    const [reportData, setReportData] = useState({
        totalUsers: adminStats.totalUsers,
        userGrowth: null,
        totalBlogs: adminStats.totalBlogs,
        blogsGrowth: null,
        totalComments: adminStats.totalComments,
        commentsGrowth: null,
        totalCreators: adminStats.totalCreators,
        creatorsGrowth: null,
        monthlyUsers: [],
        monthlyBlogs: [],
        monthlyComments: []
    });





    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/reports`,
                    { withCredentials: true }
                );

                setReportData({
                    totalUsers: response.data.totalUsers,
                    userGrowth: response.data.userGrowth,
                    totalBlogs: response.data.totalBlogs,
                    blogsGrowth: response.data.blogsGrowth,
                    totalComments: response.data.totalComments,
                    commentsGrowth: response.data.commentsGrowth,
                    totalCreators: response.data.totalCreators,
                    creatorsGrowth: response.data.creatorsGrowth,
                    monthlyUsers: response.data.monthlyUsers,
                    monthlyBlogs: response.data.monthlyBlogs,
                    monthlyComments: response.data.monthlyComments
                });
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            }
        };

        fetchReports();
    }, []);




    const maxMonthlyUsers = Math.max(
        1,
        ...reportData.monthlyUsers.map((d) => d.users)
    );

    const userGrowthPeriod = reportData.monthlyUsers.length > 0
        ? `${reportData.monthlyUsers[0].month} - ${reportData.monthlyUsers[reportData.monthlyUsers.length - 1].month
        } ${reportData.monthlyUsers[reportData.monthlyUsers.length - 1].year}`
        : "Loading...";




    return (
        <div className="admin-reports-page">
            <AdminPageHeader
                title="Reports"
                subtitle="Live overview of platform activity and performance"
            />

            {/* Summary Stats */}
            <div className="admin-reports-summary">
                <div className="admin-reports-stat-card admin-reports-stat-card--blue">
                    <IoPeopleOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Users</p>
                        <h3 className="admin-reports-stat-value">
                            {reportData.totalUsers.toLocaleString()}
                        </h3>
                        <p className={`admin-reports-stat-growth ${reportData.userGrowth < 0
                            ? "admin-reports-stat-growth--negative" : ""}`}
                        >
                            {reportData.userGrowth === null
                                ? "No previous-month data"
                                : `${reportData.userGrowth > 0 ? "+" : ""}${reportData.userGrowth}% this month`}
                        </p>
                    </div>
                </div>
                <div className="admin-reports-stat-card admin-reports-stat-card--green">
                    <IoDocumentTextOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Blogs</p>
                        <h3 className="admin-reports-stat-value">
                            {reportData.totalBlogs.toLocaleString()}
                        </h3>
                        <p
                            className={`admin-reports-stat-growth ${reportData.blogsGrowth < 0
                                ? "admin-reports-stat-growth--negative"
                                : ""
                                }`}
                        >
                            {reportData.blogsGrowth === null
                                ? "No previous-month data"
                                : `${reportData.blogsGrowth > 0 ? "+" : ""}${reportData.blogsGrowth}% this month`}
                        </p>
                    </div>
                </div>
                <div className="admin-reports-stat-card admin-reports-stat-card--orange">
                    <IoChatbubblesOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Comments</p>
                        <h3 className="admin-reports-stat-value">
                            {reportData.totalComments.toLocaleString()}
                        </h3>

                        <p
                            className={`admin-reports-stat-growth ${reportData.commentsGrowth < 0
                                ? "admin-reports-stat-growth--negative"
                                : ""
                                }`}
                        >
                            {reportData.commentsGrowth === null
                                ? "No previous-month data"
                                : `${reportData.commentsGrowth > 0 ? "+" : ""}${reportData.commentsGrowth}% this month`}
                        </p>
                    </div>
                </div>
                <div className="admin-reports-stat-card admin-reports-stat-card--purple">
                    <IoStarOutline className="admin-reports-stat-icon" />
                    <div>
                        <p className="admin-reports-stat-label">Total Creators</p>
                        <h3 className="admin-reports-stat-value">
                            {reportData.totalCreators.toLocaleString()}
                        </h3>

                        <p
                            className={`admin-reports-stat-growth ${reportData.creatorsGrowth < 0
                                ? "admin-reports-stat-growth--negative"
                                : ""
                                }`}
                        >
                            {reportData.creatorsGrowth === null
                                ? "No previous-month data"
                                : `${reportData.creatorsGrowth > 0 ? "+" : ""}${reportData.creatorsGrowth}% this month`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts row */}
            <div className="admin-reports-charts">

                {/* User Growth Chart */}
                <div className="admin-section-card admin-reports-chart-card">
                    <h3 className="admin-reports-chart-title">User Growth</h3>

                    <p className="admin-reports-chart-subtitle">
                        Monthly new users ({userGrowthPeriod})
                    </p>

                    <div className="admin-reports-bar-chart">
                        {reportData.monthlyUsers.map((d) => (
                            <div
                                key={`${d.year}-${d.month}`}
                                className="admin-reports-bar-col"
                            >
                                <span className="admin-reports-bar-val">
                                    {d.users}
                                </span>

                                <div className="admin-reports-bar-wrap">
                                    <div
                                        className="admin-reports-bar admin-reports-bar--blue"
                                        style={{
                                            height: `${(d.users / maxMonthlyUsers) * 100
                                                }%`
                                        }}
                                    />
                                </div>

                                <span className="admin-reports-bar-label">
                                    {d.month}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blog Activity Chart */}
                <div className="admin-section-card admin-reports-chart-card">
                    <h3 className="admin-reports-chart-title">Blog Activity</h3>

                    <p className="admin-reports-chart-subtitle">
                        Monthly blog posts created
                    </p>

                    <div className="admin-reports-bar-chart">
                        {(() => {
                            const maxMonthlyBlogs = Math.max(
                                1,
                                ...reportData.monthlyBlogs.map((d) => d.blogs)
                            );

                            return reportData.monthlyBlogs.map((d) => (
                                <div
                                    key={`${d.year}-${d.month}`}
                                    className="admin-reports-bar-col"
                                >
                                    <span className="admin-reports-bar-val">
                                        {d.blogs}
                                    </span>

                                    <div className="admin-reports-bar-wrap">
                                        <div
                                            className="admin-reports-bar admin-reports-bar--green"
                                            style={{
                                                height: `${(d.blogs / maxMonthlyBlogs) * 100
                                                    }%`
                                            }}
                                        />
                                    </div>

                                    <span className="admin-reports-bar-label">
                                        {d.month}
                                    </span>
                                </div>
                            ));
                        })()}
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
                            {reportData.monthlyUsers.map((userData, index) => {
                                const blogData = reportData.monthlyBlogs[index];
                                const commentData = reportData.monthlyComments[index];

                                const blogs = blogData?.blogs ?? 0;
                                const comments = commentData?.comments ?? 0;

                                const engagementRate = blogs > 0
                                    ? ((comments / blogs) * 100).toFixed(1)
                                    : "0.0";

                                return (
                                    <tr key={`${userData.year}-${userData.month}`}>
                                        <td className="admin-reports-month-cell">
                                            {userData.month} {userData.year}
                                        </td>
                                        <td>{userData.users}</td>
                                        <td>{blogs}</td>
                                        <td>{comments}</td>
                                        <td>
                                            <div className="admin-reports-engagement">
                                                <div
                                                    className="admin-reports-engagement-bar"
                                                    style={{
                                                        width: `${Math.min(
                                                            Number(engagementRate),
                                                            100
                                                        )}%`
                                                    }}
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
