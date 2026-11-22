# Purple Wheels Foundation — Project Documentation

**Subject:** Software Construction and Development (SCD)
**Document Type:** Software Engineering Project Documentation
**Application Type:** Full-Stack Blogging Web Application

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Objectives](#2-project-objectives)
3. [Technology Stack](#3-technology-stack)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [System Architecture](#6-system-architecture)
7. [Database Design](#7-database-design)
8. [Module Description](#8-module-description)
9. [System Workflows](#9-system-workflows)
10. [API Documentation](#10-api-documentation)
11. [Security Implementation](#11-security-implementation)
12. [Error Handling and Validation](#12-error-handling-and-validation)
13. [Installation and Setup](#13-installation-and-setup)
14. [Testing Overview](#14-testing-overview)
15. [Project Limitations and Future Enhancements](#15-project-limitations-and-future-enhancements)
16. [Conclusion](#16-conclusion)

---

## 1. Project Overview

### 1.1 Background and Purpose

The Purple Wheels Foundation is a dedicated blogging platform developed for a content creator living with a C5–C6 spinal cord injury. The creator had previously shared her personal experiences, motivational messages, lifestyle content, and disability-related insights through Facebook, a general-purpose social media platform.

The core challenge with using Facebook was that personal motivational content was mixed with advertisements, unrelated posts from other pages, and general social media activity. This made it difficult for her dedicated audience — people interested in disability-related experiences, motivation, and awareness — to find, follow, and explore her content in one organized place.

The idea behind this project is to give her content its own dedicated online home: a focused blogging website where everything is organized and presented exclusively for the purpose she intends.

> **Note:** The initial visual design for this project was inspired by an existing Figma design found online, which was used as a visual reference. The actual implementation — including frontend development, backend architecture, database design, API development, authentication, and all functional logic — was built by the developer from that design reference.

### 1.2 Problem Statement

People living with spinal cord injuries and other physical disabilities may benefit greatly from accessible sources of encouragement, shared experiences, and relatable content from people going through similar situations. However, when such content is distributed across general-purpose social media platforms like Facebook, the following challenges arise:

- Content gets mixed with unrelated posts, advertisements, and social media noise.
- Visitors cannot easily find older posts or browse by topic.
- There is no organized collection of posts dedicated to a single creator's journey.
- The platform's algorithm prioritizes engagement over content relevance, burying meaningful posts.

There is a clear need for a dedicated platform where meaningful personal experiences, motivational messages, and informative blog posts can be published, organized, and accessed in one focused location.

### 1.3 Proposed Solution

To address this problem, a dedicated blogging website was developed for the Purple Wheels Foundation. The platform provides:

- A centralized space to publish blog posts organized by categories such as Wellness, Fashion, Travel, Motivation, and Food.
- Tag-based content discovery so visitors can find posts on specific topics.
- A trending posts algorithm so the most engaging content rises to the top.
- User accounts for followers who want to engage by liking, commenting, saving, and following creators.
- An administration panel where platform moderators can manage content, users, categories, and site settings.

The platform does not replace social media entirely but provides a dedicated, organized space for the creator's content that can complement social media presence.

### 1.4 Target Audience

| Audience Group | Description |
|---|---|
| People with spinal cord injuries | Individuals seeking motivation and shared experiences from someone in a similar situation |
| People with physical disabilities | Visitors looking for disability-related lifestyle content and awareness |
| Families and caregivers | Individuals supporting someone with a disability who want informative content |
| General visitors | Anyone interested in disability awareness, motivation, wellness, and lifestyle topics |
| Registered users / Creators | People who create accounts to engage with content or publish their own posts |
| Platform administrators | Moderators managing content quality, users, and site settings |

### 1.5 Scope of the Project

The scope of this project includes:

- A publicly accessible landing page presenting the Purple Wheels Foundation.
- User registration and login with role-based access (user and admin).
- A complete blog platform where authenticated users can read, create, edit, and delete posts.
- Engagement features including likes, saves, comments, replies, and follow/unfollow.
- A trending posts algorithm based on likes, views, and post age.
- Related posts recommendations based on shared categories and tags.
- A personal analytics dashboard for creators showing views, likes, comment trends, and growth rates.
- A full-featured administrator panel for managing users, blogs, comments, categories, and platform settings.
- Cloudinary-based image hosting for blog cover images.
- Email-based OTP password reset functionality.

The scope does **not** include: real-time messaging, medical or healthcare advice, payment processing, SMS notifications (UI only, not functionally connected), or social media account linking (UI present but not functionally implemented).

---

## 2. Project Objectives

### 2.1 Main Objectives

1. Develop a dedicated blogging platform for the Purple Wheels Foundation that provides organized and accessible content in one place.
2. Implement a secure, role-based authentication system supporting regular users and administrators.
3. Build a fully functional content management system with approval workflows for blog posts and comments.
4. Create an engaging reading experience with likes, saves, comments, related posts, and sharing features.
5. Provide creators with personal analytics to understand how their content is performing.
6. Give administrators complete visibility and control over platform content, users, and settings.

### 2.2 Specific Goals

- Allow any visitor to browse published blog posts on the public landing page or the blog feed.
- Allow registered users to create blog posts with a rich text editor and cover image upload.
- Allow administrators to approve or reject submitted blog posts before they are visible to the public.
- Implement a trending score algorithm to surface popular content on the Explore page.
- Support tag-based and category-based filtering of blog posts.
- Provide a saved posts feature so users can bookmark content for later reading.
- Implement a password reset flow using email OTP verification.
- Track unique blog views per user to prevent view inflation.
- Prevent duplicate likes using unique database constraints.

### 2.3 Expected Outcomes

- A functional blogging website that consolidates the creator's content in one organized location.
- A platform where interested readers can easily discover, browse, and engage with disability-related lifestyle content.
- An administration system that gives moderators tools to maintain content quality and manage the community.
- A foundation that can be extended with additional features over time.

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology | Version | Purpose in This Project |
|---|---|---|
| React | 19.x | Core frontend framework; builds the user interface as a component-based single-page application |
| React DOM | 19.x | Renders React components to the browser's DOM |
| React Router DOM | 7.x | Handles client-side routing between pages (Home, Explore, Admin Panel, Auth, etc.) |
| Vite | 8.x | Frontend build tool and development server; provides fast hot module replacement during development |
| Axios | 1.x | HTTP client used to communicate with the backend REST API; sends requests with credentials |
| Tiptap (React) | 3.x | Rich text editor used in the blog creation form; supports bold, italic, underline, headings, lists, and character count |
| Tiptap Starter Kit | 3.x | Provides built-in Tiptap extensions (paragraph, heading, bold, italic, etc.) |
| Tiptap Underline | 3.x | Adds underline formatting support to the rich text editor |
| Tiptap Character Count | 3.x | Displays a live character count in the blog editor |
| React Icons | 5.x | Icon library providing UI icons (heart, bookmark, eye, share, etc.) |
| Toastify JS | 1.x | Toast notification library used for user feedback messages (success, error, info) |
| Plain CSS | — | Component-level and page-level styling; each component has its own `.css` file |

### 3.2 Backend Technologies

| Technology | Version | Purpose in This Project |
|---|---|---|
| Node.js | — | JavaScript runtime environment for the server-side application |
| Express.js | 5.x | Web application framework; defines API routes, middleware pipeline, and HTTP server |
| Mongoose | 9.x | ODM (Object Data Modeling) library for MongoDB; defines schemas, models, and database queries |
| JSON Web Token (jsonwebtoken) | 9.x | Creates and verifies JWT tokens for stateless authentication |
| bcryptjs | 3.x | Hashes user passwords before storing them in the database |
| Multer | 2.x | Handles multipart/form-data for image file uploads (stores files in memory before uploading to Cloudinary) |
| Cloudinary SDK | 2.x | Uploads blog cover images to the Cloudinary CDN and returns public image URLs |
| Nodemailer | 10.x | Sends transactional emails (OTP for password reset) via Gmail SMTP |
| cookie-parser | 1.x | Parses cookies from incoming HTTP requests (used to read the JWT token cookie) |
| cors | 2.x | Configures Cross-Origin Resource Sharing to allow the frontend domain to call the backend API |
| dotenv | 17.x | Loads environment variables from the `.env` file into `process.env` |
| nodemon | 3.x | Auto-restarts the development server when source files change |

### 3.3 Database

| Technology | Purpose in This Project |
|---|---|
| MongoDB | NoSQL document database; stores all application data including users, blogs, comments, likes, views, follows, categories, settings, and password reset records |
| MongoDB Atlas | Cloud-hosted MongoDB service used for the production database |

### 3.4 Third-Party Services

| Service | Purpose |
|---|---|
| Cloudinary | Cloud image storage and CDN delivery for blog cover images |
| Gmail SMTP (via Nodemailer) | Sending OTP verification emails for password reset |

### 3.5 Development Tools

| Tool | Purpose |
|---|---|
| ESLint | JavaScript linting for code quality |
| Vite | Development server and production build tool |
| nodemon | Automatic backend server restart during development |

---

## 4. Functional Requirements

### 4.1 Public Access Module

|  ID   | Functionality    | Description | Access |
|-------|------------------|-------------|--------|
| FR-01 | Landing Page     | A publicly accessible landing page presenting the Purple Wheels Foundation with navigation, about section, gallery, journey, stats, and footer | Anyone |
| FR-02 | Public Blog Feed | Published blog posts are visible on the main feed without requiring login | Anyone |
| FR-03 | Blog Filtering by Category | Visitors can filter the blog feed by category (Wellness, Fashion, Travel, Motivation, Food) | Anyone |

### 4.2 Authentication Module

| ID | Functionality | Description | Access |
|---|---|---|---|
| FR-04 | User Registration | Users can create an account by providing a username, email, password, and confirmation. Age above 18 must be acknowledged. Frontend validates all fields before submitting | Public |
| FR-05 | User Login | Registered users log in with email and password. The system validates credentials, checks account status, and verifies the submitted role matches the user's actual role | Public |
| FR-06 | Admin Login | Admins log in through a separate `/admin/login` route. The same login form sends `role: "admin"` and the backend rejects login if the user's role does not match | Public |
| FR-07 | Session Management | Upon successful login/registration, a JWT token is issued and stored in an HTTP-only cookie. The session lasts 24 hours | Authenticated |
| FR-08 | Persistent Session | On page load, the application checks `/api/auth/me` using the stored cookie to restore the user's session | Authenticated |
| FR-09 | Logout | Users can log out from the Settings page. The backend clears the JWT cookie | Authenticated |
| FR-10 | Forgot Password (OTP) | Users can request a password reset by entering their email. A 6-digit OTP is generated and sent via email, valid for 10 minutes | Public |
| FR-11 | OTP Verification | Users enter the received OTP. If valid and not expired, a short-lived (10-minute) reset token is issued as a cookie | Public |
| FR-12 | Password Update | Users submit a new password (minimum 8 characters). The system verifies the reset token and OTP verification status before updating the password | Public |
| FR-13 | Account Type Selection | A "Choose Your Account" page allows users to select between creator/user and admin roles, routing them to the appropriate login flow | Public |

### 4.3 Blog Module

| ID | Functionality | Description | Access |
|---|---|---|---|
| FR-14 | View All Blogs | Authenticated users view all approved blog posts on the Home feed, with optional category filtering | Authenticated |
| FR-15 | View Blog Detail | Authenticated users can open a specific blog post to read the full content. Displays title, body, author info, like/view counts, follow button, comments, and related posts | Authenticated |
| FR-16 | View Trending Blogs | The Explore page shows up to 50 trending blogs sorted by a calculated score: `(likeCount × 2 + viewCount) / (ageInHours + 24)`. Posts from the last 30 days are prioritized; older posts serve as a fallback | Authenticated |
| FR-17 | Tag-Based Filtering | Both the Home and Explore pages support filtering blogs by tag via query parameters | Authenticated |
| FR-18 | Create Blog Post | Authenticated users can create a new blog post with a title, optional subtitle, rich-text body (via Tiptap editor), category, tags, date, and a cover image uploaded to Cloudinary | Authenticated |
| FR-19 | Update Blog Post | Authors can edit their own blog posts (title, subtitle, description, category, tags, and optionally replace the cover image). Ownership is verified before allowing updates | Authenticated (own posts only) |
| FR-20 | Delete Blog Post | Authors can delete their own blog posts. The system also deletes all related likes and views. The author's post count is decremented | Authenticated (own posts only) |
| FR-21 | Blog Approval Workflow | When a blog is submitted, its initial status (`pending` or `approved`) is determined by the platform's `blogApprovalMode` setting. Only blogs with `status: "approved"` are visible to other users | Configured by Admin |
| FR-22 | My Blogs | Authenticated users can view all their own blog posts (all statuses: pending, approved, rejected) in the Analytics page | Authenticated |
| FR-23 | Record Blog Views | When a user opens a blog post, a view is recorded. Each user can only count as one view per post (unique index enforced) | Authenticated |
| FR-24 | Related Posts | When viewing a blog, up to 6 related posts are shown. Relevance is scored by shared category (+2) and shared tags (+3 per tag). Posts with zero relevance score are filled with recent posts | Authenticated |
| FR-25 | Draft Posts | Users can save blog post drafts locally in browser `localStorage`. Drafts are stored and loaded per user ID. They are not sent to the server | Authenticated |

### 4.4 Engagement Module

| ID | Functionality | Description | Access |
|---|---|---|---|
| FR-26 | Like a Blog | Users can like an approved blog post. A `BlogLike` record is created. The blog's `likeCount` is incremented. Duplicate likes are prevented via a unique database index | Authenticated |
| FR-27 | Unlike a Blog | Users can remove their like. The `BlogLike` record is deleted and `likeCount` is decremented | Authenticated |
| FR-28 | Save a Blog | Users can save an approved blog post to their saved list. The blog's ID is added to the user's `savedPosts` array using `$addToSet` to prevent duplicates | Authenticated |
| FR-29 | Unsave a Blog | Users can remove a saved post. The blog ID is removed from the user's `savedPosts` array using `$pull` | Authenticated |
| FR-30 | View Saved Posts | Users can access all their saved posts in a dedicated Saved Posts page | Authenticated |
| FR-31 | Add Comment | Authenticated users can add a comment to a blog post. The comment's initial status is determined by the platform's `commentApprovalMode` setting | Authenticated |
| FR-32 | Reply to Comment | Users can reply to an existing comment. Replies store a `parentComment` reference linking them to the original comment | Authenticated |
| FR-33 | View Comments | Approved comments for a blog post are displayed in the Post Detail view | Authenticated |
| FR-34 | Follow a Creator | Authenticated users can follow another user. The system prevents self-following and duplicate follows. Both users' `followers`/`following` counts are updated | Authenticated |
| FR-35 | Unfollow a Creator | Users can unfollow a previously followed user. Counts are decremented accordingly | Authenticated |
| FR-36 | Follow Status Check | The system returns whether the current user is already following a specific user | Authenticated |
| FR-37 | Share a Post | Users can share a blog post via a share modal that shows the current page URL | Authenticated |

### 4.5 Discovery and Analytics Module

| ID | Functionality | Description | Access |
|---|---|---|---|
| FR-38 | Creators Page | Authenticated users can browse all users who have at least one approved blog post. Each creator is shown with username, profile image, post count, followers, following, and follow status | Authenticated |
| FR-39 | Top Creators | The Explore page sidebar shows up to 5 top creators sorted by follower count and post count | Authenticated |
| FR-40 | Trending Tags | The Explore page sidebar shows up to 10 trending tags extracted from trending posts | Authenticated |
| FR-41 | Personal Analytics | The Analytics page shows the creator's total views, total likes, total comments, and engagement rate. Growth percentages compare the current 30-day period to the previous 30-day period | Authenticated |

### 4.6 Administration Module

| ID | Functionality | Description | Access |
|---|---|---|---|
| FR-42 | Admin Dashboard | Displays platform-wide statistics: total users, blogs, comments, and creators, with this-month vs. last-month growth. Also shows 5 most recent users and 5 most recent blogs, plus monthly trend charts for users, blogs, and comments | Admin |
| FR-43 | User Management | Admins can list all users (paginated), search by username or email, filter by role or status, view individual user profiles, change user status (active/inactive), change user role (user/admin), and delete users | Admin |
| FR-44 | Blog Management | Admins can list all blogs (paginated), search by title or author, filter by category or status, view individual blog details, change blog status (approved/pending/rejected), and delete blogs | Admin |
| FR-45 | Comment Management | Admins can list all comments (paginated), search by text, author, or blog title, filter by status, change comment status (approved/pending/rejected), and delete comments (cascades to replies) | Admin |
| FR-46 | Creator Management | Admins can list all creators (users with at least one post) with pagination, search, and status filtering | Admin |
| FR-47 | Category Management | Admins can create new categories, update category names, activate or deactivate categories, and delete categories (deletion is blocked if blogs are using that category) | Admin |
| FR-48 | Blog Approval Mode Setting | Admins can switch the blog submission approval mode between `approved` (auto-approve) and `pending` (require admin review) | Admin |
| FR-49 | Comment Approval Mode Setting | Admins can switch the comment approval mode between `approved` (auto-approve) and `pending` (require admin review) | Admin |
| FR-50 | Reports | Admins can view monthly registration, blog publication, and comment trends for the past 7 months, plus a category distribution breakdown of all blog posts | Admin |

### 4.7 Settings Module

| ID | Functionality | Description | Access |
|---|---|---|---|
| FR-51 | Settings Page | Displays user profile information (username, email) in read-only form fields. Provides UI sections for password change, social account connections, and notification preferences. Only the logout functionality is currently connected to the backend | Authenticated |
| FR-52 | Logout | Users can log out from the Settings page, which clears the JWT cookie and resets the auth context | Authenticated |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Requirement | Implementation Status |
|---|---|
| Blog list responses should load quickly | Implemented — Mongoose queries use `.populate()` only on required fields (e.g., `username profileImage`) to minimize data transfer |
| Trending score calculation is performed in-memory | Implemented — Trending scores are computed after fetching blogs from the database, then sorted and limited to 50 results |
| Admin dashboard loads multiple data sources in parallel | Implemented — `Promise.all()` is used throughout admin controllers to fetch multiple collections simultaneously |
| Pagination on admin list endpoints | Implemented — Users, blogs, comments, and creators endpoints support `page` and `limit` query parameters |

### 5.2 Security

| Requirement | Implementation Status |
|---|---|
| Passwords must be hashed before storage | Implemented — bcryptjs hashes passwords with salt rounds = 10 |
| Authentication tokens must be HTTP-only cookies | Implemented — JWT stored in `httpOnly`, `secure` (in production), `sameSite: none` (in production) cookies |
| Protected routes require a valid token | Implemented — `authMiddleware` validates the JWT on all protected endpoints |
| Admin-only endpoints require role verification | Implemented — `adminMiddleware` checks the user's role in the database on every admin API request |
| Password reset requires OTP verification before update | Implemented — A `verified` flag on the `passwordReset` record prevents updating the password without completing OTP verification |
| Reset token is scoped with a `purpose` claim | Implemented — The JWT for password reset includes `purpose: "password-reset"` and expires in 10 minutes |
| CORS is restricted to known frontend origins | Implemented — CORS is configured to allow only `http://localhost:5173` and the `CLIENT_URL` environment variable |
| Duplicate likes and views prevented at database level | Implemented — Unique compound indexes on `(blog, user)` for `BlogLike` and `BlogView` collections |
| Input validation on all forms | Implemented — Both frontend and backend validate required fields, minimum lengths, and enum values |

### 5.3 Reliability

| Requirement | Implementation Status |
|---|---|
| Database connection resilience for serverless deployment | Implemented — A connection promise caching pattern in `db.js` prevents redundant connections and handles cold starts on serverless platforms like Vercel |
| Database availability is checked before every request | Implemented — A middleware in `app.js` calls `connectDb()` before routing any request |
| Cascading deletes for data integrity | Implemented — Deleting a blog removes all related likes, views, and (admin-side) comments. Deleting a comment removes its replies |

### 5.4 Maintainability

| Requirement | Description |
|---|---|
| Separation of concerns | Backend is organized into distinct layers: routes, controllers, services, models, and middleware |
| Component-based frontend | Each UI piece is a reusable React component with its own CSS file |
| Environment-driven configuration | All sensitive configuration is stored in `.env` files and accessed via `process.env` |
| Consistent API response format | All API responses follow a consistent `{ message, data }` JSON structure |

### 5.5 Usability

| Requirement | Implementation Status |
|---|---|
| Toast notifications for user feedback | Implemented — `toastify-js` provides non-blocking feedback messages for all major actions |
| Loading states during API calls | Implemented — Loading states are managed with React `useState` and displayed as text indicators or spinners |
| Responsive layout | CSS is applied at the component level; full responsive behavior was not independently verified during this analysis |
| Empty state messaging | Implemented — The UI displays appropriate "no content found" messages when lists are empty |

### 5.6 Scalability

The current architecture is suitable for a small-to-medium content platform. MongoDB's document model scales horizontally. The serverless deployment model (compatible with Vercel, as noted in comments in `db.js` and `index.js`) supports auto-scaling. However, as content and users grow, additional optimizations such as MongoDB indexes on frequently queried fields, pagination on the public blog list, and caching layers would be needed.

### 5.7 Compatibility

The frontend is built as a modern SPA with React 19 and ES module syntax. It targets modern browsers. The Vite build tool produces optimized production assets. The backend targets Node.js with CommonJS modules and is compatible with serverless environments.

---

## 6. System Architecture

### 6.1 Overall Architecture

The application follows a **three-tier architecture**:

1. **Presentation Layer (Frontend):** A React Single-Page Application (SPA) built with Vite that handles all user interactions and communicates with the backend via HTTP REST API calls using Axios.
2. **Application Layer (Backend):** A Node.js/Express REST API server organized into routes, controllers, middleware, and services.
3. **Data Layer (Database):** A MongoDB database (hosted on MongoDB Atlas) accessed through Mongoose ODM.

```
┌─────────────────────────┐         ┌──────────────────────────┐         ┌──────────────────────┐
│   FRONTEND (React SPA)  │         │   BACKEND (Express API)  │         │   DATABASE (MongoDB) │
│                         │  HTTP/  │                          │ Mongoose│                      │
│  Vite + React Router    │◄───────►│  Routes → Controllers    │◄───────►│  Collections:        │
│  Axios + AuthContext    │  HTTPS  │  Middleware → Services   │         │  users, blog,        │
│  Tiptap Rich Editor     │         │  Cloudinary / Nodemailer │         │  comments, etc.      │
└─────────────────────────┘         └──────────────────────────┘         └──────────────────────┘
```

### 6.2 Frontend Architecture

The frontend is a React SPA organized into the following layers:

| Directory | Purpose |
|---|---|
| `src/pages/` | Top-level page components for each route (LandingPage, Auth, MpLifeStyle, AdminPanel, Settings) |
| `src/components/` | Reusable UI components grouped by feature area (Auth, MPLifeStyle, AdminPanel, Spinner) |
| `src/context/` | React Context API for global state; `AuthContext.jsx` provides user state and loading state to the entire application |
| `src/routes/` | Custom route guard components (`ProtectedRoute`, `AdminProtectedRoute`) that enforce authentication and role checks before rendering protected pages |
| `src/utils/` | Utility functions used across the application (toast notifications, number formatting, avatar URL generation, time formatting, trending tag extraction) |
| `src/assets/` | Static images, icons (SVG), and media assets |

**State Management:** The application uses React's built-in `useState` and `useEffect` hooks for local component state. Global user authentication state is managed through the React Context API (`AuthContext`) rather than an external state management library.

**Routing:** React Router DOM v7 handles client-side navigation. Routes are defined in `App.jsx`. The `/MP-LifeStyle` route and all its nested sub-routes (home, explore, creators, analytics, saved-post, post-detail) are wrapped in `ProtectedRoute`. The `/admin` route and all its nested sub-routes are wrapped in `AdminProtectedRoute`.

**API Communication:** All API calls use Axios with `withCredentials: true` where the JWT cookie needs to be sent. The backend domain is configured via the `VITE_DOMAIN_NAME` environment variable, keeping the base URL configurable for development vs. production.

### 6.3 Backend Architecture

The backend is a Node.js/Express application organized with a clear separation of concerns:

| Directory / File | Purpose |
|---|---|
| `index.js` | Entry point; starts the HTTP server in non-production environments; exports the app for serverless platforms |
| `src/app.js` | Configures the Express application: JSON parsing, cookie parsing, CORS, database connection middleware, and route mounting |
| `src/routes/` | Route definitions; maps URL paths and HTTP methods to controller functions |
| `src/controllers/` | Business logic for each domain area; handles request processing and response formatting |
| `src/controllers/admin/` | Admin-specific controllers for dashboard, users, blogs, comments, categories, settings, and reports |
| `src/middleware/` | Cross-cutting middleware: `auth.middleware.js` (JWT verification), `admin.middleware.js` (role verification), `upload.js` (Multer file upload configuration) |
| `src/model/` | Mongoose schemas and models for each database collection |
| `src/services/` | Shared service modules for Cloudinary image upload, email sending, and admin statistics |
| `src/db/db.js` | Database connection logic with connection promise caching for serverless compatibility |

### 6.4 Database Architecture

MongoDB is used as the database. All data is stored as BSON documents in the following collections:

- `users` — Platform accounts with roles and profile data
- `blog` — Blog post content and metadata
- `comments` — Post comments and threaded replies
- `BlogLike` — Like records (one per user per blog)
- `BlogView` — View records (one per user per blog)
- `follows` — Follow relationships between users
- `Category` — Available blog categories
- `Settings` — Platform configuration key-value pairs
- `passwordReset` — Temporary OTP records for password resets

### 6.5 Frontend–Backend Communication

The frontend communicates with the backend exclusively through HTTP REST API calls:

- **Protocol:** HTTP (development), HTTPS (production on Vercel)
- **Authentication:** JWT token stored in an HTTP-only cookie, automatically sent with every credentialed request (`withCredentials: true`)
- **Request format:** JSON for POST/PUT/PATCH bodies; `multipart/form-data` for file uploads
- **Response format:** JSON with consistent `{ message, data }` structure
- **API base URL:** Configured via `VITE_DOMAIN_NAME` environment variable in the frontend

### 6.6 Request–Response Lifecycle

A typical authenticated API request flows as follows:

1. The user performs an action in the React UI (e.g., clicking Like).
2. The React component calls an Axios function with `withCredentials: true`.
3. The browser automatically attaches the `token` cookie to the HTTP request.
4. Express receives the request and passes it through the cookie-parser middleware.
5. The `connectDb()` middleware ensures the MongoDB connection is active.
6. The route definition matches the URL and HTTP method and calls the controller function.
7. `authMiddleware` reads the token cookie, verifies the JWT, and attaches the decoded user payload to `req.user`.
8. For admin routes, `adminMiddleware` queries the database to verify the user's role is `admin`.
9. The controller function executes the business logic (database queries, service calls).
10. The controller sends a JSON response with an appropriate HTTP status code.
11. Axios receives the response and the React component updates its state accordingly.

### 6.7 Important Architectural Decisions

| Decision | Rationale |
|---|---|
| HTTP-only cookie for JWT | Prevents XSS attacks from accessing the authentication token via JavaScript |
| Serverless-compatible database connection | The connection promise caching pattern in `db.js` prevents connection exhaustion on serverless platforms where the server process may not persist between requests |
| In-memory trending score calculation | Keeps the trending algorithm flexible without requiring stored computed fields in MongoDB |
| Draft posts stored in localStorage | Provides a lightweight drafts feature without requiring backend storage, keeping the system simple |
| Multer memory storage + Cloudinary streaming upload | Avoids writing temporary files to disk; images are processed in memory and streamed directly to Cloudinary |
| Blog approval mode as a database setting | Allows admins to change the approval workflow at runtime without code changes or server restarts |

---

## 7. Database Design

### 7.1 Collection: `users`

**Model file:** `src/model/user.model.js`
**Mongoose model name:** `users`

| Field | Type | Required | Unique | Default | Description |
|---|---|---|---|---|---|
| `_id` | ObjectId | Auto | Yes | Auto-generated | Primary identifier |
| `username` | String | Yes | No | — | Display name of the user |
| `email` | String | Yes | Yes | — | Email address (lowercase, trimmed) used for login |
| `password` | String | Yes | No | — | bcrypt-hashed password |
| `profileImage` | String | No | No | `null` | URL of the user's profile picture |
| `role` | String (enum) | No | No | `"user"` | User role: `"user"` or `"admin"` |
| `postCount` | Number | No | No | `0` | Count of blog posts created by the user |
| `followers` | Number | No | No | `0` | Count of users following this user |
| `following` | Number | No | No | `0` | Count of users this user is following |
| `savedPosts` | [ObjectId] | No | No | `[]` | Array of ObjectIds referencing saved blog posts |
| `status` | String (enum) | No | No | `"active"` | Account status: `"active"` or `"inactive"` |
| `createdAt` | Date | Auto | No | Auto-generated | Timestamp when the account was created |
| `updatedAt` | Date | Auto | No | Auto-updated | Timestamp when the account was last updated |

**References:** `savedPosts` references the `blog` collection.

---

### 7.2 Collection: `blog`

**Model file:** `src/model/blogs.model.js`
**Mongoose model name:** `blog`

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto | Primary identifier |
| `title` | String | Yes | Blog post title (trimmed) |
| `subtitle` | String | No | Optional subtitle (max 200 characters) |
| `description` | String | Yes | Full blog content (may contain HTML from the rich text editor) |
| `image` | String | Yes | Cloudinary URL of the cover image |
| `category` | String (enum) | Yes | One of: `"wellness"`, `"fashion"`, `"travel"`, `"motivation"`, `"food"` |
| `tags` | [String] | No | Array of lowercase string tags |
| `likeCount` | Number | No | Cached count of likes (default: 0) |
| `viewCount` | Number | No | Cached count of unique views (default: 0) |
| `status` | String (enum) | No | One of: `"pending"`, `"approved"`, `"rejected"` (default: `"pending"`) |
| `author` | ObjectId | Yes | References the `users` collection |
| `createdAt` | Date | Auto | Timestamp of creation |
| `updatedAt` | Date | Auto | Timestamp of last update |

**Note:** The category field in the blog schema uses a hardcoded enum (`["wellness", "fashion", "travel", "motivation", "food"]`). The `Category` collection is a separate entity used to validate categories at blog creation time and manage them from the admin panel. These two are not automatically synchronized.

---

### 7.3 Collection: `comments`

**Model file:** `src/model/comments.model.js`
**Mongoose model name:** `comments`

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | — | Primary identifier |
| `blog` | ObjectId | Yes | — | References the `blog` collection |
| `author` | ObjectId | Yes | — | References the `users` collection |
| `parentComment` | ObjectId | No | `null` | References the `comments` collection (used for replies; `null` for top-level comments) |
| `text` | String | Yes | — | The comment content (trimmed) |
| `likeCount` | Number | No | `0` | Reserved field (not functionally active in the current implementation) |
| `status` | String (enum) | No | `"approved"` | One of: `"pending"`, `"approved"`, `"rejected"` |
| `createdAt` | Date | Auto | — | Timestamp of creation |
| `updatedAt` | Date | Auto | — | Timestamp of last update |

**Thread Model:** Replies are stored as separate `comments` documents with their `parentComment` field pointing to the parent comment's `_id`. There is no nesting limit enforced at the data level.

---

### 7.4 Collection: `BlogLike`

**Model file:** `src/model/blogLike.model.js`
**Mongoose model name:** `BlogLike`

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto | Primary identifier |
| `blog` | ObjectId | Yes | References the `blog` collection |
| `user` | ObjectId | Yes | References the `users` collection |
| `createdAt` | Date | Auto | Timestamp when the like was created |

**Unique Index:** `{ blog: 1, user: 1 }` — prevents a user from liking the same blog more than once at the database level.

---

### 7.5 Collection: `BlogView`

**Model file:** `src/model/blogView.model.js`
**Mongoose model name:** `BlogView`

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto | Primary identifier |
| `blog` | ObjectId | Yes | References the `blog` collection |
| `user` | ObjectId | Yes | References the `users` collection |
| `createdAt` | Date | Auto | Timestamp when the view was recorded |

**Unique Index:** `{ blog: 1, user: 1 }` — ensures each user is counted as only one unique view per blog post.

---

### 7.6 Collection: `follows`

**Model file:** `src/model/follows.model.js`
**Mongoose model name:** `follows`

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto | Primary identifier |
| `follower` | ObjectId | Yes | The user who is following (references `users`) |
| `following` | ObjectId | Yes | The user being followed (references `users`) |
| `createdAt` | Date | Auto | Timestamp of when the follow relationship was created |

**Unique Index:** `{ follower: 1, following: 1 }` — prevents duplicate follow relationships.

---

### 7.7 Collection: `Category`

**Model file:** `src/model/category.model.js`
**Mongoose model name:** `Category`

| Field | Type | Required | Unique | Default | Description |
|---|---|---|---|---|---|
| `_id` | ObjectId | Auto | Yes | Auto-generated | Primary identifier |
| `name` | String | Yes | Yes | — | Category name (unique, trimmed) |
| `isActive` | Boolean | No | No | `true` | Whether the category is currently active and available for use |
| `createdAt` | Date | Auto | No | — | Timestamp of creation |
| `updatedAt` | Date | Auto | No | — | Timestamp of last update |

---

### 7.8 Collection: `Settings`

**Model file:** `src/model/settings.model.js`
**Mongoose model name:** `Settings`

| Field | Type | Required | Unique | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | Yes | Primary identifier |
| `key` | String | Yes | Yes | Setting identifier key (e.g., `"blogApprovalMode"`, `"commentApprovalMode"`) |
| `value` | String (enum) | Yes | No | Setting value: `"pending"` or `"approved"` |

**Currently configured keys:**
- `blogApprovalMode`: Controls whether new blogs start as `pending` or `approved`
- `commentApprovalMode`: Controls whether new comments start as `pending` or `approved`

---

### 7.9 Collection: `passwordReset`

**Model file:** `src/model/passwordReset.model.js`
**Mongoose model name:** `passwordReset`

| Field | Type | Required | Unique | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | Yes | Primary identifier |
| `email` | String | Yes | Yes | The email address associated with the password reset request |
| `code` | String | Yes | No | The 6-digit OTP code sent to the user |
| `expiresAt` | Date | Yes | No | Expiration timestamp (10 minutes from creation) |
| `verified` | Boolean | No | No | Becomes `true` after the user successfully enters the correct OTP |

---

### 7.10 Collection Relationships Summary

```
users ─────────────────────────── blog (1 user : many blogs, via author field)
users ─────────────────────────── comments (1 user : many comments, via author field)
users ─────────────────────────── BlogLike (1 user : many likes)
users ─────────────────────────── BlogView (1 user : many views)
users ─────────────────────────── follows (many-to-many via follower/following fields)
users.savedPosts ───────────────── blog (array of ObjectId references)

blog ───────────────────────────── comments (1 blog : many comments)
blog ───────────────────────────── BlogLike (1 blog : many likes)
blog ───────────────────────────── BlogView (1 blog : many views)

comments ───────────────────────── comments (self-reference via parentComment for replies)
```

---

## 8. Module Description

### 8.1 Authentication Module

**Files:** `src/controllers/auth.controller.js`, `src/routes/auth.route.js`, `src/middleware/auth.middleware.js`, `src/model/user.model.js`, `src/model/passwordReset.model.js`, `src/services/email.service.js`

**Purpose:** Manages all aspects of user identity — registration, login, session management, and password recovery.

**Responsibilities:**
- Validate registration input and ensure email uniqueness before creating a user.
- Hash passwords using bcrypt before storage.
- Issue JWT tokens as HTTP-only cookies upon successful login or registration.
- Verify the submitted `role` on login to enforce separate admin and user login flows.
- Block login for accounts with `status: "inactive"`.
- Provide a multi-step password reset flow: OTP generation → email delivery → OTP verification → password update.
- Provide the `/api/auth/me` endpoint for session restoration on page load.
- Handle logout by clearing the JWT cookie.

**Key interactions:** Interacts with the `users` collection and `passwordReset` collection. Uses the email service to send OTP emails.

---

### 8.2 Blog Management Module

**Files:** `src/controllers/blogs.controller.js`, `src/routes/blogs.route.js`, `src/model/blogs.model.js`, `src/model/blogView.model.js`, `src/services/cloudinary.service.js`

**Purpose:** Handles all operations related to blog post creation, retrieval, modification, deletion, and discovery features.

**Responsibilities:**
- Create blog posts: validate fields, verify category exists and is active, determine initial status from the `blogApprovalMode` setting, upload cover image to Cloudinary, increment the author's post count.
- Retrieve approved blogs with optional category and tag filtering.
- Calculate trending scores and return top 50 trending posts.
- Return related posts using a category and tag relevance scoring algorithm.
- Record unique blog views (one view per user per blog).
- Allow authors to update or delete their own posts (with ownership verification).
- Collect and return analytics data (views, likes, comments) for the current user's blogs over 30-day periods.
- Return creators (users with approved posts) and top creators (by follower count).

**Key interactions:** Interacts with `blog`, `users`, `follows`, `BlogView`, `BlogLike`, `comments`, `Settings`, and `Category` collections. Uses Cloudinary service for image uploads.

---

### 8.3 Engagement Module

**Files:** `src/controllers/blogLikes.controller.js`, `src/controllers/blogSave.controller.js`, `src/controllers/comments.controller.js`, `src/controllers/follow.controller.js`

**Purpose:** Manages all social engagement actions: liking, saving, commenting, replying, following, and unfollowing.

**Responsibilities:**
- Manage blog likes with duplicate prevention (unique index + application-level check).
- Manage saved posts using `$addToSet` and `$pull` MongoDB operators.
- Create comments and replies; apply the `commentApprovalMode` setting to determine initial status.
- Retrieve approved comments for a given blog post.
- Manage follow relationships with self-follow prevention, duplicate prevention, and bidirectional counter updates.

**Key interactions:** Interacts with `BlogLike`, `BlogView`, `users`, `comments`, `follows`, and `blog` collections.

---

### 8.4 Administration Module

**Files:** `src/controllers/admin/`, `src/routes/admin.route.js`, `src/middleware/admin.middleware.js`, `src/services/admin/adminStats.service.js`

**Purpose:** Provides complete platform management capabilities accessible only to users with the `admin` role.

**Responsibilities:**
- **Dashboard:** Aggregate platform statistics (totals, monthly comparisons, growth percentages, recent activity).
- **User management:** List, search, filter, view, update status, update role, and delete users. Prevents admins from modifying their own account status or role.
- **Blog management:** List, search, filter, view, update status, and delete blogs. Cascades deletion to likes, views, and comments.
- **Comment management:** List, search, filter, update status, and delete comments. Cascades deletion to replies.
- **Category management:** Create, rename, activate, deactivate, and delete categories.
- **Settings management:** Read and update `blogApprovalMode` and `commentApprovalMode`.
- **Reports:** Generate 7-month trend data for users, blogs, and comments; show category distribution of all blog posts.

**Key interactions:** Interacts with all database collections. All admin routes are protected by both `authMiddleware` and `adminMiddleware`.

---

### 8.5 Frontend Routing and Navigation Module

**Files:** `src/App.jsx`, `src/routes/ProtectedRoute.jsx`, `src/routes/AdminProtectedRoute.jsx`, `src/context/AuthContext.jsx`

**Purpose:** Manages client-side routing and enforces access control at the frontend level.

**Responsibilities:**
- Define the complete application route tree.
- `ProtectedRoute`: redirects unauthenticated users to `/login`.
- `AdminProtectedRoute`: redirects unauthenticated users to `/admin/login`; redirects authenticated non-admin users to `/MP-LifeStyle`.
- `AuthContext`: on application startup, calls `/api/auth/me` to restore the user session. Provides `user`, `setUser`, and `loading` state to all components via React Context.

---

### 8.6 Content Creation Module

**Files:** `src/components/MPLifeStyle/CreateNewPost/CreateNewPost.jsx`, `src/components/MPLifeStyle/RichTextEditor/RichTextEditor.jsx`

**Purpose:** Provides the interface for creating and editing blog posts.

**Responsibilities:**
- Render a modal/overlay form for creating or editing a blog post.
- Provide a Tiptap-based rich text editor supporting bold, italic, underline, headings, bullet lists, ordered lists, and character count.
- Handle cover image file selection (displayed as preview).
- Support drafts: save form data to localStorage for later editing.
- Submit the completed form as `multipart/form-data` to the backend API.

---

### 8.7 Settings and Profile Module

**Files:** `src/pages/Settings/Settings.jsx`

**Purpose:** Provides a user-facing settings page.

**Responsibilities:**
- Display the current user's username and email in read-only fields.
- Display UI sections for password change, social account connections, and notification preferences.
- Handle logout by calling the logout API and clearing the auth context.

**Note:** As verified from the source code, the Settings page currently only has logout connected to the backend. The personal information form, password change fields, social account connect buttons, and notification preference toggles are UI-only and do not submit to or retrieve from any backend endpoint.

---

## 9. System Workflows

### 9.1 User Registration Workflow

1. The user navigates to `/register`.
2. The user fills in the registration form (username, email, password, confirm password) and checks the age confirmation checkbox.
3. The frontend validates the form (all fields required, password ≥ 8 characters, passwords match, age checkbox checked).
4. If validation passes, the frontend sends a `POST /api/auth/register` request with `{ username, email, password }`.
5. The backend checks that all fields are present.
6. The backend queries the database to verify the email is not already registered.
7. If the email exists, it returns `409 Conflict`.
8. If the email is new, the password is hashed with bcrypt (10 salt rounds).
9. A new user document is created in the `users` collection with `role: "user"` and `status: "active"`.
10. A JWT is signed with the new user's `_id` and expires in 24 hours.
11. The JWT is set as an HTTP-only cookie in the response.
12. The response includes the new user's `userId`, `username`, and `email`.
13. The frontend stores the user object in the `AuthContext`.
14. The user is redirected to `/MP-LifeStyle`.

---

### 9.2 User Login Workflow

1. The user navigates to `/login` or `/admin/login`.
2. The user enters their email and password.
3. The frontend validates that both fields are present and password ≥ 8 characters.
4. The frontend sends `POST /api/auth/login` with `{ email, password, role }` where `role` is `"user"` for `/login` and `"admin"` for `/admin/login`.
5. The backend checks that both email and password are provided.
6. The backend queries the `users` collection for the submitted email.
7. If not found, it returns `401 Unauthorized`.
8. The backend compares the submitted password with the stored hash using bcrypt.
9. If the password is incorrect, it returns `401 Unauthorized`.
10. If the user's `status` is `"inactive"`, it returns `403 Forbidden`.
11. If the user's `role` does not match the submitted `role`, it returns `403 Forbidden`.
12. A JWT is signed with `{ userId }` and expires in 24 hours.
13. The JWT is set as an HTTP-only cookie.
14. The frontend calls `GET /api/auth/me` to retrieve the full user profile.
15. The user is stored in `AuthContext`.
16. Admin users are redirected to `/admin/dashboard`; regular users are redirected to `/MP-LifeStyle`.

---

### 9.3 Password Reset Workflow

1. The user navigates to `/forgot-password` and enters their email.
2. The frontend sends `POST /api/auth/forgot-password` with `{ email }`.
3. The backend verifies the user exists in the database.
4. A 6-digit OTP is generated using `crypto.randomInt()`.
5. An expiration timestamp is set 10 minutes in the future.
6. The OTP, expiration, and `verified: false` are upserted into the `passwordReset` collection for the user's email.
7. The OTP is sent to the user's email via Nodemailer (Gmail SMTP).
8. The user is redirected to `/verification`.
9. The user enters the 6-digit OTP from their email.
10. The frontend sends `POST /api/auth/verify-reset-code` with `{ email, otp }`.
11. The backend finds the `passwordReset` record and checks that it has not expired.
12. The submitted OTP is compared (as a string) to the stored code.
13. If valid, the `passwordReset` record is updated with `verified: true`.
14. A short-lived (10-minute) JWT with `{ userId, purpose: "password-reset" }` is set as the `resetToken` cookie.
15. The user is redirected to `/create-password`.
16. The user enters and confirms a new password.
17. The frontend sends `POST /api/auth/update-password` with `{ password }`.
18. The backend reads the `resetToken` cookie and verifies it. It checks that `purpose` equals `"password-reset"`.
19. The backend finds the `passwordReset` record and verifies that `verified` is `true`.
20. The new password is hashed with bcrypt and saved to the user document.
21. The `passwordReset` record is deleted.
22. The `resetToken` cookie is cleared.

---

### 9.4 Blog Creation Workflow

1. An authenticated user clicks "New Post" on the Home or Analytics page.
2. The `CreateNewPost` modal opens.
3. The user fills in the title, optional subtitle, body (using the Tiptap rich text editor), category, comma-separated tags, date, and selects a cover image.
4. The user can save the post as a draft (stored in `localStorage`) or submit it.
5. When submitting, the form data is sent as `multipart/form-data` via `POST /api/blogs/create-blog` with the image file included.
6. The backend's `authMiddleware` verifies the JWT cookie.
7. Multer processes the uploaded image file and stores it in memory.
8. The backend validates that all required fields (title, description, image, category, date) are present.
9. The backend queries the `Category` collection to verify the submitted category is active.
10. The backend queries the `Settings` collection for `blogApprovalMode` to determine the initial status (`"pending"` or `"approved"`).
11. The image buffer is streamed to Cloudinary via the `upload_stream` API. The returned secure URL is stored.
12. A new blog document is created in the `blog` collection.
13. The author's `postCount` is incremented using `$inc`.
14. The response includes the created blog object.

---

### 9.5 Blog Approval Workflow (Admin)

1. When `blogApprovalMode` is set to `"pending"`, newly submitted blogs have `status: "pending"` and are not visible to other users.
2. An admin navigates to `/admin/blogs`.
3. The admin can filter blogs by `status: pending` to find blogs awaiting review.
4. The admin opens a specific blog and reviews it.
5. The admin sends `PATCH /api/admin/blogs/:id/status` with `{ status: "approved" }` or `{ status: "rejected" }`.
6. The backend updates the blog's `status` field.
7. Approved blogs immediately become visible on the public blog feed. Rejected blogs remain invisible.

---

### 9.6 Like/Unlike Workflow

**Liking a post:**
1. User clicks the heart icon on a blog post.
2. Frontend sends `POST /api/blogs/:blogId/like`.
3. Backend verifies the blog exists and is approved.
4. Backend checks if a `BlogLike` record already exists for this `(blog, user)` pair.
5. If a like exists, returns `400 Bad Request`.
6. Otherwise, creates a `BlogLike` document and increments `blog.likeCount` by 1.

**Unliking a post:**
1. User clicks the filled heart icon.
2. Frontend sends `DELETE /api/blogs/:blogId/like`.
3. Backend verifies the `BlogLike` record exists.
4. Deletes the `BlogLike` document and decrements `blog.likeCount` by 1.

---

### 9.7 Follow/Unfollow Workflow

1. User clicks "Follow" on a creator's profile (visible in Post Detail or Creators pages).
2. Frontend sends `POST /api/follows/:userId`.
3. Backend prevents self-follow if the target user ID equals the requesting user's ID.
4. Backend verifies the target user exists.
5. Backend checks for an existing follow relationship.
6. If following already exists, returns `400 Bad Request`.
7. Otherwise, creates a `follows` document, increments the follower's `following` counter, and increments the target user's `followers` counter.

---

### 9.8 Admin User Management Workflow

1. Admin navigates to `/admin/users`.
2. The page sends `GET /api/admin/users` with optional `search`, `role`, `status`, `page`, and `limit` query parameters.
3. The backend applies text search (regex on username and email), role filter, status filter, pagination skip/limit, and returns the paginated user list.
4. Admin can deactivate a user: `PATCH /api/admin/users/:id/status` with `{ status: "inactive" }`.
5. When a deactivated user attempts to log in, the backend returns `403 Forbidden` with a message indicating the account has been restricted.
6. Admin can change a user's role: `PATCH /api/admin/users/:id/role` with `{ role: "admin" }`.
7. Admin can delete a user: `DELETE /api/admin/users/:id`. (Note: related blogs, comments, likes, and views are **not** automatically deleted when a user is deleted in the current implementation.)

---

## 10. API Documentation

All API endpoints are prefixed with `/api`. Authentication is cookie-based (the JWT `token` cookie must be present for protected routes).

### 10.1 Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Purpose | Auth Required | Role |
|---|---|---|---|---|
| POST | `/api/auth/register` | Register a new user account | No | — |
| POST | `/api/auth/login` | Log in and receive a session cookie | No | — |
| GET | `/api/auth/me` | Get the authenticated user's full profile | Yes | Any |
| POST | `/api/auth/logout` | Log out and clear the session cookie | No | — |
| POST | `/api/auth/forgot-password` | Request a password reset OTP | No | — |
| POST | `/api/auth/verify-reset-code` | Verify the OTP and receive a reset token | No | — |
| POST | `/api/auth/update-password` | Update the password using the reset token | No | — |

---

**POST `/api/auth/register`**

| Item | Detail |
|---|---|
| Request Body | `{ username: string, email: string, password: string }` |
| Success Response | `201` — `{ message, user: { userId, username, email } }` + sets `token` cookie |
| Error Responses | `400` — Missing fields; `409` — Email already exists |

---

**POST `/api/auth/login`**

| Item | Detail |
|---|---|
| Request Body | `{ email: string, password: string, role: "user" \| "admin" }` |
| Success Response | `200` — `{ message, user: { userId, username, email } }` + sets `token` cookie |
| Error Responses | `400` — Missing fields; `401` — Invalid credentials; `403` — Account inactive or role mismatch |

---

**GET `/api/auth/me`**

| Item | Detail |
|---|---|
| Auth | JWT cookie required. If cookie absent, returns `200 { user: null }` without calling middleware |
| Success Response | `200` — `{ message, user: { all fields except password } }` |
| Error Responses | `401` — Invalid/expired token; `404` — User not found |

---

**POST `/api/auth/forgot-password`**

| Item | Detail |
|---|---|
| Request Body | `{ email: string }` |
| Success Response | `200` — `{ message: "Verification code sent to your email" }` |
| Error Responses | `400` — Missing email or user not found; `500` — Email send failure |

---

**POST `/api/auth/verify-reset-code`**

| Item | Detail |
|---|---|
| Request Body | `{ email: string, otp: string }` |
| Success Response | `200` — `{ message }` + sets `resetToken` cookie (10-minute expiry) |
| Error Responses | `400` — Missing fields, expired OTP, invalid OTP; `404` — No reset request found |

---

**POST `/api/auth/update-password`**

| Item | Detail |
|---|---|
| Request Body | `{ password: string }` |
| Auth | Requires `resetToken` cookie |
| Success Response | `200` — `{ message, user: { id, email, name } }` + clears `resetToken` cookie |
| Error Responses | `400` — Missing password/token, min length, OTP not verified; `403` — Invalid token purpose; `404` — User not found |

---

### 10.2 Blog Endpoints (`/api/blogs`)

| Method | Endpoint | Purpose | Auth Required | Role |
|---|---|---|---|---|
| GET | `/api/blogs/` | Get all approved blogs (optional `?category=` and `?tag=` filters) | No | — |
| GET | `/api/blogs/trending` | Get trending blogs sorted by score (optional `?category=` `?tag=`) | No | — |
| GET | `/api/blogs/my-blogs` | Get all blogs by the authenticated user (all statuses) | Yes | User |
| GET | `/api/blogs/analytics` | Get analytics data for the current user's blogs | Yes | User |
| GET | `/api/blogs/creators` | Get all users with at least one approved blog | Yes | User |
| GET | `/api/blogs/topCreators` | Get top 5 creators by followers and post count | Yes | User |
| GET | `/api/blogs/saved` | Get all saved blogs of the current user | Yes | User |
| GET | `/api/blogs/:id` | Get a single approved blog by ID (includes isLiked, isSaved) | Yes | User |
| GET | `/api/blogs/:id/related` | Get up to 6 related blogs by category and tag relevance | Yes | User |
| POST | `/api/blogs/create-blog` | Create a new blog post (multipart/form-data with image) | Yes | User |
| POST | `/api/blogs/:id/view` | Record a unique blog view for the current user | Yes | User |
| POST | `/api/blogs/:blogId/like` | Like a blog post | Yes | User |
| DELETE | `/api/blogs/:blogId/like` | Unlike a blog post | Yes | User |
| POST | `/api/blogs/:blogId/save` | Save a blog post to the user's saved list | Yes | User |
| DELETE | `/api/blogs/:blogId/save` | Remove a blog post from the user's saved list | Yes | User |
| PUT | `/api/blogs/:id` | Update a blog post (author only; multipart/form-data) | Yes | User (owner) |
| DELETE | `/api/blogs/:id` | Delete a blog post (author only) | Yes | User (owner) |

---

**GET `/api/blogs/`**

| Item | Detail |
|---|---|
| Query Params | `category` (optional), `tag` (optional) |
| Success Response | `200` — `{ message, blogs: [...] }` where each blog is populated with author fields |
| Notes | Only returns blogs with `status: "approved"` |

---

**GET `/api/blogs/trending`**

| Item | Detail |
|---|---|
| Query Params | `category` (optional), `tag` (optional) |
| Success Response | `200` — `{ message, blogs: [...] }` sorted by trending score (max 50) |
| Algorithm | `score = (likeCount × 2 + viewCount) / (ageInHours + 24)`; prefers last 30 days |

---

**POST `/api/blogs/create-blog`**

| Item | Detail |
|---|---|
| Content Type | `multipart/form-data` |
| Request Body | `title`, `description`, `category`, `date` (required); `subtitle`, `tags` (optional); `image` (file, required) |
| Success Response | `201` — `{ message, blog }` |
| Error Responses | `400` — Missing fields or invalid/inactive category; `500` — Cloudinary upload failure |

---

### 10.3 Comment Endpoints (`/api/blogs/comments`)

| Method | Endpoint | Purpose | Auth Required |
|---|---|---|---|
| POST | `/api/blogs/comments/` | Add a comment to a blog post | Yes |
| POST | `/api/blogs/comments/:commentId/reply` | Add a reply to an existing comment | Yes |
| GET | `/api/blogs/comments/:blogId` | Get all approved comments for a blog | No |

---

**POST `/api/blogs/comments/`**

| Item | Detail |
|---|---|
| Request Body | `{ blogId: string, text: string }` |
| Success Response | `201` — `{ message, comment }` |
| Notes | Comment status is determined by the `commentApprovalMode` platform setting |

---

**POST `/api/blogs/comments/:commentId/reply`**

| Item | Detail |
|---|---|
| Request Body | `{ text: string }` |
| Success Response | `201` — `{ message, reply }` |
| Error Responses | `400` — Invalid comment ID; `404` — Parent comment not found |

---

### 10.4 Follow Endpoints (`/api/follows`)

| Method | Endpoint | Purpose | Auth Required |
|---|---|---|---|
| POST | `/api/follows/:userId` | Follow a user | Yes |
| DELETE | `/api/follows/:userId` | Unfollow a user | Yes |
| GET | `/api/follows/:userId` | Check if the current user is following a specific user | Yes |

---

**POST `/api/follows/:userId`**

| Item | Detail |
|---|---|
| Success Response | `200` — `{ message: "User followed successfully" }` |
| Error Responses | `400` — Self-follow or already following; `404` — Target user not found |

---

**GET `/api/follows/:userId`**

| Item | Detail |
|---|---|
| Success Response | `200` — `{ isFollowing: boolean }` |

---

### 10.5 Category Endpoints (`/api/categories`)

| Method | Endpoint | Purpose | Auth Required |
|---|---|---|---|
| GET | `/api/categories/` | Get all active categories | No |

---

### 10.6 Admin Endpoints (`/api/admin`)

All admin endpoints require authentication (`authMiddleware`) and admin role verification (`adminMiddleware`). Users without admin role receive `403 Forbidden`.

#### User Management

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/users` | List all users (paginated, searchable, filterable) |
| GET | `/api/admin/users/:id` | Get a specific user by ID |
| PATCH | `/api/admin/users/:id/status` | Update user account status (`active`/`inactive`) |
| PATCH | `/api/admin/users/:id/role` | Update user role (`user`/`admin`) |
| DELETE | `/api/admin/users/:id` | Delete a user account |
| GET | `/api/admin/creators` | List all users with at least one post (paginated, searchable, filterable) |

---

**GET `/api/admin/users`**

| Item | Detail |
|---|---|
| Query Params | `search` (username/email), `role` (all/user/admin), `status` (all/active/inactive), `page`, `limit` |
| Success Response | `200` — `{ message, users: [...], pagination: { currentPage, pageSize, totalUsers, totalPages } }` |

---

**PATCH `/api/admin/users/:id/status`**

| Item | Detail |
|---|---|
| Request Body | `{ status: "active" \| "inactive" }` |
| Success Response | `200` — `{ message, user }` |
| Error Responses | `400` — Invalid ID, invalid status, or self-deactivation attempt; `404` — User not found |

---

#### Blog Management

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/blogs` | List all blogs (paginated, searchable, filterable) |
| GET | `/api/admin/blogs/:id` | Get a specific blog by ID |
| PATCH | `/api/admin/blogs/:id/status` | Update blog status (`pending`/`approved`/`rejected`) |
| DELETE | `/api/admin/blogs/:id` | Delete a blog (cascades to likes, views, and comments) |

---

#### Comment Management

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/comments` | List all comments (paginated, searchable, filterable) |
| PATCH | `/api/admin/comments/:id/status` | Update comment status (`pending`/`approved`/`rejected`) |
| DELETE | `/api/admin/comments/:id` | Delete a comment (cascades to its replies) |

---

#### Category Management

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/categories` | List all categories (active and inactive) |
| POST | `/api/admin/categories` | Create a new category |
| PATCH | `/api/admin/categories/:id` | Update a category name |
| PATCH | `/api/admin/categories/:id/activate` | Activate a category |
| PATCH | `/api/admin/categories/:id/deactivate` | Deactivate a category |
| DELETE | `/api/admin/categories/:id` | Delete a category (blocked if any blogs use it) |

---

#### Settings

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/settings/blog-approval-mode` | Get current blog approval mode |
| PATCH | `/api/admin/settings/blog-approval-mode` | Update blog approval mode (`pending`/`approved`) |
| GET | `/api/admin/settings/comment-approval-mode` | Get current comment approval mode |
| PATCH | `/api/admin/settings/comment-approval-mode` | Update comment approval mode (`pending`/`approved`) |

---

#### Dashboard and Reports

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/dashboard` | Get platform stats, recent users/blogs, and monthly trend data |
| GET | `/api/admin/reports` | Get 7-month trend data for users/blogs/comments and category distribution |

---

**GET `/api/admin/dashboard`**

| Item | Detail |
|---|---|
| Success Response | `200` — `{ success, totalUsers, blogsThisMonth, ..., recentUsers, recentBlogs, monthlyUser, monthlyBlogs, monthlyComments }` |

---

## 11. Security Implementation

### 11.1 Authentication

- **JWT (JSON Web Tokens):** Authentication tokens are signed using `jsonwebtoken` with the `JWT_SECRET` environment variable. Tokens contain the user's `_id` as the payload and expire after 24 hours.
- **HTTP-only Cookies:** Tokens are delivered and stored exclusively in HTTP-only cookies, which prevents client-side JavaScript from accessing them, mitigating XSS attacks.
- **Secure Cookie Attributes:** In production (`NODE_ENV === "production"`), cookies are set with `secure: true` (HTTPS only) and `sameSite: "none"` (required for cross-origin requests in production). In development, `secure: false` and `sameSite: "lax"` are used.

### 11.2 Authorization

- **`authMiddleware`:** Applied to all protected routes. Reads the `token` cookie, verifies it with `jwt.verify()`, and attaches the decoded payload to `req.user`. Returns `401` if the token is missing, invalid, or expired.
- **`adminMiddleware`:** Applied to all admin routes after `authMiddleware`. Queries the database to retrieve the user's current role. Returns `403` if the user's role is not `"admin"`. This check uses the database rather than the JWT payload, ensuring role changes take effect immediately without requiring re-login.
- **Role-Based Login:** The login endpoint requires the client to submit the expected role. If the user's actual role in the database does not match the submitted role, login is rejected with `403`.

### 11.3 Password Handling

- **bcryptjs:** All passwords are hashed with bcrypt using 10 salt rounds before being stored. Plain-text passwords are never stored.
- **Password field exclusion:** The `/api/auth/me` and all admin user endpoints use `.select("-password")` to ensure the hashed password is never included in API responses.
- **Minimum length enforcement:** Both frontend and backend enforce a minimum password length of 8 characters.

### 11.4 Password Reset Security

- **Cryptographically random OTP:** `crypto.randomInt(100000, 1000000)` generates a 6-digit random code using Node.js's built-in crypto module.
- **OTP expiration:** Reset codes expire after 10 minutes (`expiresAt` field checked server-side).
- **Verification flag:** A `verified` boolean on the `passwordReset` document prevents the update-password endpoint from succeeding unless the OTP was actually verified.
- **Purpose-scoped reset token:** The reset token JWT includes `purpose: "password-reset"` and expires in 10 minutes. The update-password endpoint explicitly checks this `purpose` claim, preventing regular session tokens from being used for password resets.
- **Cleanup:** After a successful password update, the `passwordReset` document is deleted and the `resetToken` cookie is cleared.

### 11.5 Protected Routes (Frontend)

- **`ProtectedRoute`:** Checks the AuthContext. If `loading` is true, renders nothing (waits for session check). If `user` is `null`, redirects to `/login`.
- **`AdminProtectedRoute`:** Same as above but also checks `user.role === "admin"`. Non-admin users are redirected to `/MP-LifeStyle`.

### 11.6 Input Validation

- **Frontend:** Form components validate required fields, minimum lengths, password match, and checkbox conditions before submitting.
- **Backend:** Controllers validate required fields, enum values (role, status, category), MongoDB ObjectId validity, and self-action prevention (self-follow, self-delete, self-role-change).
- **Search input escaping:** Admin search queries escape regex special characters before building search filters.

### 11.7 Data Integrity

- **Unique indexes:** `BlogLike`, `BlogView`, and `follows` collections have unique compound indexes to prevent duplicate records at the database level.
- **Duplicate prevention at application level:** Controllers also check for existing records before creation to provide meaningful error messages.
- **Category validation:** Blog creation validates that the submitted category exists and is active in the `Category` collection.
- **Cascading deletes:** Deleting a blog removes its related likes, views, and (admin-side) comments to prevent orphaned records.

### 11.8 CORS Configuration

The backend restricts cross-origin requests to known frontend origins:
- `http://localhost:5173` (development)
- The value of `process.env.CLIENT_URL` (production frontend URL)

The `credentials: true` option allows cookies to be included in cross-origin requests.

### 11.9 Security Limitations

| Limitation | Description |
|---|---|
| No rate limiting | There is no rate limiting on any endpoint, including the forgot-password endpoint. This could allow brute-force OTP guessing or excessive email sending |
| No CSRF protection | The application uses HTTP-only cookies without additional CSRF token verification |
| No input sanitization for HTML | Blog descriptions may contain HTML from the Tiptap editor, which is rendered using `dangerouslySetInnerHTML`. There is no server-side HTML sanitization in the current implementation |
| No token refresh mechanism | Sessions expire after 24 hours with no refresh. Users must log in again after expiry |
| User deletion does not cascade | Deleting a user via the admin panel does not delete their blogs, comments, likes, views, or follows |

---

## 12. Error Handling and Validation

### 12.1 Backend Error Handling

- **Consistent HTTP status codes:** Controllers return appropriate status codes: `200` (success), `201` (created), `400` (bad request / validation error), `401` (unauthenticated), `403` (forbidden), `404` (not found), `409` (conflict), `500` (server error).
- **Try-catch blocks:** Most controller functions are wrapped in `try-catch` to handle unexpected errors gracefully.
- **Mongoose error handling:** Some controllers explicitly handle `CastError` (invalid MongoDB ObjectId) and `ValidationError` (schema validation failure) and return `400` with the appropriate message.
- **Database unavailability:** The `connectDb()` middleware in `app.js` catches database connection failures and returns `500 { error: "Database unavailable" }` before any route handler runs.

### 12.2 Frontend Error Handling

- **Axios error handling:** All Axios calls are wrapped in `try-catch`. Error messages are extracted from `error.response?.data?.message` with a fallback generic message.
- **Form validation errors:** Displayed inline as a red text paragraph (`auth-error` class) below the form submission button.
- **Toast notifications:** Errors during API calls (failed to load blogs, failed to like, etc.) are displayed as toast notifications using `toastify-js`.
- **Loading states:** All API-dependent components show loading indicators while requests are in progress and handle empty states gracefully.

### 12.3 Validation Rules Summary

| Field | Frontend Validation | Backend Validation |
|---|---|---|
| Email | Required, email format | Required, unique, lowercase |
| Password | Required, min 8 characters | Required, min 8 characters (on reset) |
| Confirm Password | Must match password | — |
| Username | Required | Required |
| Blog title | — | Required, trimmed |
| Blog description | — | Required, trimmed |
| Blog image | — | Required |
| Blog category | — | Required, must exist in Category collection and be active |
| OTP | — | Must match stored code, must not be expired |
| User role | — | Must be `"user"` or `"admin"` |
| User status | — | Must be `"active"` or `"inactive"` |
| Blog status | — | Must be `"pending"`, `"approved"`, or `"rejected"` |
| Comment status | — | Must be `"pending"`, `"approved"`, or `"rejected"` |

---

## 13. Installation and Setup

### 13.1 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB** (a running MongoDB instance or MongoDB Atlas cluster)
- A **Cloudinary** account for image uploads
- A **Gmail** account with an App Password for email sending

### 13.2 Project Structure

```
Purple Wheel Foundation/
├── backend/                  ← Backend application
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── services/
│   │   └── db/
│   ├── index.js
│   ├── package.json
│   └── .env                  ← Backend environment variables (create this)
│
└── Purple-Wheel-Foundation/  ← Frontend application
    ├── src/
    │   ├── App.jsx
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── routes/
    │   └── utils/
    ├── package.json
    └── .env                  ← Frontend environment variables (create this)
```

### 13.3 Backend Setup

**Step 1:** Navigate to the backend directory.
```bash
cd backend
```

**Step 2:** Install dependencies.
```bash
npm install
```

**Step 3:** Create a `.env` file in the `backend/` directory with the following variables:

| Variable | Purpose |
|---|---|
| `PORT` | Port number for the backend server (e.g., `3000`) |
| `MONGO_URI` | MongoDB connection string (e.g., from MongoDB Atlas) |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens (use a long random string) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `EMAIL_USER` | Gmail address used to send OTP emails |
| `APP_PASSWORD` | Gmail App Password for the above email account |
| `CLIENT_URL` | Frontend URL for CORS in production (e.g., `https://your-frontend.vercel.app`) |
| `NODE_ENV` | Set to `production` in production, leave unset or `development` in development |

> **Important:** Never commit the `.env` file to version control. The `.gitignore` file should include `.env`.

**Step 4:** Start the development server.
```bash
npm run dev
```

The backend server will start on the configured port (default: `3000`).

---

### 13.4 Frontend Setup

**Step 1:** Navigate to the frontend directory.
```bash
cd Purple-Wheel-Foundation
```

**Step 2:** Install dependencies.
```bash
npm install
```

**Step 3:** Create a `.env` file in the `Purple-Wheel-Foundation/` directory with the following variables:

| Variable | Purpose |
|---|---|
| `VITE_DOMAIN_NAME` | Base URL of the backend API (e.g., `http://localhost:3000` for development) |

**Step 4:** Start the development server.
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

---

### 13.5 Development Commands

**Backend:**

| Command | Description |
|---|---|
| `npm run dev` | Start development server with nodemon (auto-restart on file change) |
| `npm start` | Start production server |

**Frontend:**

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with hot module replacement |
| `npm run build` | Build optimized production assets |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 14. Testing Overview

### 14.1 Automated Tests

No automated test files (unit tests, integration tests, or end-to-end tests) were found in either the frontend or backend directories during the analysis of this project.

The `backend/package.json` contains a `test` script that outputs `"Error: no test specified"`, confirming that no test suite has been configured.

### 14.2 Suggested Manual Test Scenarios

The following manual test scenarios are recommended for verifying the application's key functionality:

#### Authentication Tests

| Test Case | Steps | Expected Outcome |
|---|---|---|
| Registration with valid data | Fill all fields, check age checkbox, submit | Account created, redirected to `/MP-LifeStyle` |
| Registration with duplicate email | Use an email already registered | `409` error displayed in the form |
| Login with correct user credentials | Enter valid email and password at `/login` | Logged in and redirected to `/MP-LifeStyle` |
| Login with admin credentials at user login | Attempt to log in as admin from `/login` | `403` error (role mismatch) |
| Login with inactive account | Deactivate account from admin panel, then attempt login | `403` error with account restriction message |
| Password reset full flow | Trigger forgot-password, enter OTP, set new password | Password updated, can log in with new password |
| OTP expiration | Wait 10+ minutes after requesting OTP, then submit | `400` error indicating OTP expired |

#### Blog Tests

| Test Case | Expected Outcome |
|---|---|
| Create a blog in `pending` approval mode | Blog created with `status: pending`, not visible on public feed |
| Create a blog in `approved` approval mode | Blog created with `status: approved`, visible on public feed |
| Approve a blog from admin panel | Blog status changes to `approved`, becomes visible on public feed |
| Like a blog twice | Second like returns `400 Blog already liked` |
| View a blog twice from the same user | View count increments only once |
| Delete a blog as a non-author | Returns `403 Unauthorized` |

#### Admin Tests

| Test Case | Expected Outcome |
|---|---|
| Access admin panel as a regular user | Redirected to `/MP-LifeStyle` |
| Deactivate a user account | That user cannot log in after deactivation |
| Delete a category with existing blogs | Returns `409` with message to deactivate instead |
| Switch blog approval mode | New blogs created after the switch reflect the new default status |

---

## 15. Project Limitations and Future Enhancements

### 15.1 Existing Limitations

| Limitation | Description |
|---|---|
| Settings page UI-only features | The personal information update form, password change form, social account connect buttons, and notification preference toggles on the Settings page are UI elements that do not currently connect to backend endpoints |
| No HTML sanitization | Blog descriptions are rendered as raw HTML from the Tiptap editor using `dangerouslySetInnerHTML`. Without server-side sanitization, maliciously crafted content could pose an XSS risk if users submit harmful HTML |
| No rate limiting | The API has no rate limiting, making it susceptible to brute-force attempts on the OTP endpoint or excessive API calls |
| User deletion does not cascade | When an admin deletes a user account, their blog posts, comments, likes, views, and follow records remain in the database as orphaned documents |
| No real-time updates | Comments, likes, and views do not update in real time. Users must refresh the page to see new activity |
| Blog category enum inconsistency | The blog schema has a hardcoded enum for category values (`["wellness", "fashion", "travel", "motivation", "food"]`). The admin-managed `Category` collection is used for validation at creation time but does not automatically extend the enum. If a new category is created in the admin panel, the blog schema enum must also be updated manually |
| No profile image upload | While the user model has a `profileImage` field, there is no implemented endpoint or UI for uploading a profile picture from within the application |
| Draft posts not persisted server-side | Drafts are saved only in browser `localStorage`, meaning they are lost when the user switches browsers or clears local storage |
| No pagination on the public blog list | The `GET /api/blogs/` endpoint returns all approved blogs without pagination, which could become a performance issue as the blog count grows |

### 15.2 Proposed Future Enhancements

| Enhancement | Description |
|---|---|
| Complete the Settings page | Implement backend endpoints to update user profile information and password from the Settings page |
| Profile image upload | Add a Cloudinary-based profile image upload feature similar to the blog image upload |
| HTML sanitization | Integrate a library such as `dompurify` or `sanitize-html` to sanitize blog HTML content on the server before saving it |
| Rate limiting | Implement rate limiting (e.g., using `express-rate-limit`) on the forgot-password, login, and registration endpoints |
| Cascading user deletion | When an admin deletes a user, also delete or reassign their related content to prevent orphaned data |
| Pagination on public blog list | Add `page` and `limit` query parameters to `GET /api/blogs/` to support pagination as the blog count grows |
| Real-time notifications | Integrate WebSockets or Server-Sent Events to deliver real-time comment and like notifications |
| Server-side draft storage | Persist drafts to the backend database so they are accessible across devices and browsers |
| Dynamic category synchronization | Dynamically fetch and validate the allowed category list from the `Category` collection rather than using a hardcoded enum in the blog schema |
| Search functionality | Add a full-text search endpoint and search UI for finding blog posts by keyword |
| Email verification on registration | Send a verification email after registration and require email confirmation before the account becomes active |
| Social media sharing integration | Implement actual social sharing using the Web Share API or social platform share URLs |
| Automated testing | Implement unit tests (e.g., Jest) for backend controllers and integration tests for the API endpoints |

---

## 16. Conclusion

The Purple Wheels Foundation blogging platform is a full-stack web application built to provide a dedicated, organized online space for disability-related lifestyle content. The project addresses a genuine organizational need: giving the creator's motivational and informative content its own home rather than having it scattered across a general-purpose social media platform.

### What Was Built

The application consists of two independent applications — a React SPA frontend and a Node.js/Express backend — connected through a REST API with cookie-based JWT authentication.

**Core features implemented and verified:**

- **User authentication:** Registration, login with role-based separation (user/admin), session management, and a complete three-step email OTP password reset flow.
- **Blog management:** A rich-text blog creation experience with Tiptap, Cloudinary image upload, category organization, tag support, and an admin-controlled approval workflow.
- **Content discovery:** A trending posts algorithm based on likes, views, and content age; related posts suggestions using category and tag relevance scoring; tag and category filtering; and top creators listings.
- **Community engagement:** Likes, unique view counting, comment and reply threading, post saving, follow/unfollow, and social sharing.
- **Creator analytics:** A personal dashboard tracking views, likes, comment counts, and 30-day growth comparisons.
- **Administration:** A complete admin panel with user management (activate/deactivate, role changes, deletion), blog moderation (approve/reject/delete), comment moderation, category management, platform settings, and analytical reports.
- **Security:** HTTP-only cookie JWT authentication, bcrypt password hashing, role-based access control enforced both at the route middleware level and in the database, OTP-based password reset with expiration and verification tracking, CORS configuration, and unique database indexes preventing duplicate engagement records.

### Practical Value

The platform achieves its core objective: providing a centralized, organized, and focused reading experience for the content creator's audience. Readers interested in disability-related wellness, lifestyle, motivation, and personal experiences can explore content by category and tag, discover trending posts, and engage with the creator's journey — all in one dedicated place.

The admin panel provides the tools needed to maintain content quality, manage the growing community, and control the platform's behavior without requiring code changes.

The platform lays a solid technical foundation that can be extended with additional features, improved security measures, and scalability enhancements as the audience and content library grow.

---

*Document prepared for Software Construction and Development (SCD) university subject.*
*All documentation is based on analysis of the actual source code located in the `backend/` and `Purple-Wheel-Foundation/` directories.*
