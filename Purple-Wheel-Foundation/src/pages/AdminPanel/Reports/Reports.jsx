import { useEffect, useState } from "react";
import axios from "axios";

import {
    IoPeopleOutline,
    IoDocumentTextOutline,
    IoChatbubblesOutline,
    IoStarOutline,
} from "react-icons/io5";

import AdminPageHeader from "../../../components/AdminPanel/AdminPageHeader/AdminPageHeader";


import "../AdminPanel.css";
import "./Reports.css";


const Reports = () => {
    const [reportData, setReportData] = useState({
        totalUsers: 0,
        userGrowth: null,
        totalBlogs: 0,
        blogsGrowth: null,
        totalComments: 0,
        commentsGrowth: null,
        totalCreators: 0,
        creatorsGrowth: null,
        monthlyUsers: [],
        monthlyBlogs: [],
        monthlyComments: [],
        categoryData: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);





    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_DOMAIN_NAME}/api/admin/reports`,
                    { withCredentials: true }
                );

                setReportData({
                    totalUsers: response.data.totalUsers ?? 0,
                    userGrowth: response.data.userGrowth ?? null,
                    totalBlogs: response.data.totalBlogs ?? 0,
                    blogsGrowth: response.data.blogsGrowth ?? null,
                    totalComments: response.data.totalComments ?? 0,
                    commentsGrowth: response.data.commentsGrowth ?? null,
                    totalCreators: response.data.totalCreators ?? 0,
                    creatorsGrowth: response.data.creatorsGrowth ?? null,
                    monthlyUsers: response.data.monthlyUsers ?? [],
                    monthlyBlogs: response.data.monthlyBlogs ?? [],
                    monthlyComments: response.data.monthlyComments ?? [],
                    categoryData: response.data.categoryData ?? []
                });
            } catch (error) {
                console.error("Failed to fetch reports:", error);
                setError(true);
            } finally {
                setLoading(false);
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
        : "No data available";




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
                            {loading ? "..." : error ? "—" : reportData.totalUsers.toLocaleString()}
                        </h3>
                        <p className={`admin-reports-stat-growth ${reportData.userGrowth < 0
                            ? "admin-reports-stat-growth--negative" : ""}`}
                        >
                            {loading
                                ? "Loading..."
                                : error
                                    ? "Unavailable"
                                    : reportData.userGrowth === null
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
                            {loading ? "..." : error ? "—" : reportData.totalBlogs.toLocaleString()}
                        </h3>
                        <p className={`admin-reports-stat-growth ${reportData.blogsGrowth < 0
                            ? "admin-reports-stat-growth--negative"
                            : ""
                            }`}
                        >
                            {loading
                                ? "Loading..."
                                : error
                                    ? "Unavailable"
                                    : reportData.blogsGrowth === null
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
                            {loading ? "..." : error ? "—" : reportData.totalComments.toLocaleString()}
                        </h3>

                        <p className={`admin-reports-stat-growth ${reportData.commentsGrowth < 0
                            ? "admin-reports-stat-growth--negative"
                            : ""
                            }`}
                        >
                            {loading
                                ? "Loading..."
                                : error
                                    ? "Unavailable"
                                    : reportData.commentsGrowth === null
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
                            {loading ? "..." : error ? "—" : reportData.totalCreators.toLocaleString()}
                        </h3>

                        <p className={`admin-reports-stat-growth ${reportData.creatorsGrowth < 0
                            ? "admin-reports-stat-growth--negative"
                            : ""
                            }`}
                        >
                            {loading
                                ? "Loading..."
                                : error
                                    ? "Unavailable"
                                    : reportData.creatorsGrowth === null
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


                    {loading ? (
                        <p>Loading chart data...</p>
                    ) : error ? (
                        <p>Failed to load report data.</p>
                    ) : reportData.monthlyUsers.length === 0 ? (
                        <p>No user growth data available.</p>
                    ) : (
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
                    )}
                </div>



                {/* Blog Activity Chart */}
                <div className="admin-section-card admin-reports-chart-card">
                    <h3 className="admin-reports-chart-title">Blog Activity</h3>

                    <p className="admin-reports-chart-subtitle">
                        Monthly blog posts created
                    </p>

                    {loading ? (
                        <p>Loading chart data...</p>
                    ) : error ? (
                        <p>Failed to load report data.</p>
                    ) : reportData.monthlyBlogs.length === 0 ? (
                        <p>No blog activity data available.</p>
                    ) : (
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
                                                    height: `${(d.blogs / maxMonthlyBlogs) * 100}%`
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
                    )}
                </div>
            </div>




            {/* Content Distribution */}
            <div className="admin-section-card admin-reports-categories">
                <h3 className="admin-reports-chart-title">Content by Category</h3>

                <p className="admin-reports-chart-subtitle">
                    Distribution of blog posts across categories
                </p>

                {loading ? (
                    <p>Loading category data...</p>
                ) : error ? (
                    <p>Failed to load report data.</p>
                ) : reportData.categoryData.length === 0 ? (
                    <p>No category data available.</p>
                ) : (
                    <div className="admin-reports-category-list">
                        {reportData.categoryData.map((cat) => (
                            <div key={cat.name} className="admin-reports-category-row">
                                <span className="admin-reports-category-name">
                                    {cat.name}
                                </span>

                                <div className="admin-reports-category-bar-wrap">
                                    <div
                                        className="admin-reports-category-bar"
                                        style={{ width: `${cat.percentage}%` }}
                                    />
                                </div>

                                <span className="admin-reports-category-count">
                                    {cat.count}
                                </span>

                                <span className="admin-reports-category-pct">
                                    {cat.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                )}
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
                                <th>Blog Creation Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5">Loading monthly data...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5">Failed to load report data.</td>
                                </tr>
                            ) : reportData.monthlyUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No monthly data available.</td>
                                </tr>
                            ) : (
                                reportData.monthlyUsers.map((userData) => {
                                    const blogData = reportData.monthlyBlogs.find(
                                        (item) =>
                                            item.year === userData.year &&
                                            item.month === userData.month
                                    );

                                    const commentData = reportData.monthlyComments.find(
                                        (item) =>
                                            item.year === userData.year &&
                                            item.month === userData.month
                                    );

                                    const blogs = blogData?.blogs ?? 0;
                                    const comments = commentData?.comments ?? 0;

                                    const blogCreationRate = userData.users > 0
                                        ? ((blogs / userData.users) * 100).toFixed(1)
                                        : null;

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
                                                            width: `${Math.min(Number(blogCreationRate), 100)}%`
                                                        }}
                                                    />
                                                    <span>
                                                        {blogCreationRate === null
                                                            ? "N/A"
                                                            : `${blogCreationRate}%`}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Reports;
