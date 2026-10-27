
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
    IoAddOutline,
    IoTrashOutline,
    IoEyeOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
} from "react-icons/io5";

import {
    AdminModal,
    AdminConfirmModal,
} from "../../../components/AdminPanel/AdminModal/AdminModal";

import { showToast } from "../../../utils/toast";
import "./CategoryManagement.css";

const API_BASE =
    import.meta.env.VITE_DOMAIN_NAME || "http://localhost:3000";

const ADMIN_CATEGORIES_API = `${API_BASE}/api/admin/categories`;

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(
                ADMIN_CATEGORIES_API,
                { withCredentials: true }
            );

            setCategories(response.data.categories || []);
        } catch (error) {
            showToast(
                error.response?.data?.message ||
                "Failed to load categories.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim().toLowerCase();

        if (!trimmedName) {
            showToast("Please enter a category name.", "warning");
            return;
        }

        try {
            setSaving(true);

            const response = await axios.post(
                ADMIN_CATEGORIES_API,
                { name: trimmedName },
                { withCredentials: true }
            );

            const newCategory = response.data.category;

            if (newCategory) {
                setCategories((prev) => [
                    ...prev,
                    newCategory,
                ]);
            } else {
                await fetchCategories();
            }

            setName("");

            showToast(
                response.data.message || "Category created successfully.",
                "success"
            );
        } catch (error) {
            showToast(
                error.response?.data?.message ||
                "Failed to create category.",
                "error"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleToggleStatus = async (category) => {
        const isActive =
            category.isActive ??
            category.active ??
            category.status === "active";

        const action = isActive ? "deactivate" : "activate";

        try {
            setUpdatingId(category._id);

            const response = await axios.patch(
                `${ADMIN_CATEGORIES_API}/${category._id}/${action}`,
                {},
                { withCredentials: true }
            );

            const updatedCategory = response.data.category;

            setCategories((prev) =>
                prev.map((item) =>
                    item._id === category._id
                        ? updatedCategory || {
                            ...item,
                            isActive: !isActive,
                        }
                        : item
                )
            );

            showToast(
                response.data.message ||
                `Category ${action}d successfully.`,
                "success"
            );
        } catch (error) {
            showToast(
                error.response?.data?.message ||
                `Failed to ${action} category.`,
                "error"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (category) => {

        try {
            setDeletingId(category._id);

            const response = await axios.delete(
                `${ADMIN_CATEGORIES_API}/${category._id}`,
                { withCredentials: true }
            );

            setCategories((prev) =>
                prev.filter((item) => item._id !== category._id)
            );

            setDeleteTarget(null);

            showToast(
                response.data.message || "Category deleted successfully.",
                "success"
            );
        } catch (error) {
            showToast(
                error.response?.data?.message ||
                "Failed to delete category.",
                "error"
            );
        } finally {
            setDeletingId(null);
        }
    };

    const getCategoryStatus = (category) => {
        const isActive =
            category.isActive ??
            category.active ??
            category.status === "active";

        return isActive ? "Active" : "Inactive";
    };

    return (
        <section className="admin-category-management">
            <div className="admin-category-heading">
                <div>
                    <h3>Category Management</h3>
                    <p>Create and manage blog categories.</p>
                </div>

                <button
                    type="button"
                    className="admin-category-view-btn"
                    onClick={() => setShowCategories(true)}
                >
                    <IoEyeOutline />
                    View All Categories
                </button>
            </div>

            <form
                className="admin-category-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    maxLength={60}
                    required
                />

                <button type="submit" disabled={saving}>
                    <IoAddOutline />
                    {saving ? "Creating..." : "Add Category"}
                </button>
            </form>

            <AdminModal
                isOpen={showCategories}
                onClose={() => setShowCategories(false)}
                title="All Categories"
                size="md"
            >
                <div className="admin-category-list">
                    {loading ? (
                        <p>Loading categories...</p>
                    ) : categories.length === 0 ? (
                        <p>No categories found.</p>
                    ) : (
                        categories.map((category) => {
                            const isActive =
                                getCategoryStatus(category) === "Active";

                            const isUpdating =
                                updatingId === category._id;

                            const isDeleting =
                                deletingId === category._id;

                            return (
                                <div
                                    className="admin-category-row"
                                    key={category._id}
                                >
                                    <div className="admin-category-info">
                                        <span>
                                            {category.name
                                                .charAt(0)
                                                .toUpperCase() +
                                                category.name.slice(1)}
                                        </span>

                                        <small
                                            className={
                                                isActive
                                                    ? "admin-category-status admin-category-status--active"
                                                    : "admin-category-status admin-category-status--inactive"
                                            }
                                        >
                                            {getCategoryStatus(category)}
                                        </small>
                                    </div>

                                    <div className="admin-category-actions">
                                        <button
                                            type="button"
                                            title={
                                                isActive
                                                    ? "Deactivate category"
                                                    : "Activate category"
                                            }
                                            disabled={
                                                isUpdating || isDeleting
                                            }
                                            onClick={() =>
                                                handleToggleStatus(category)
                                            }
                                        >
                                            {isActive ? (
                                                <IoCloseCircleOutline />
                                            ) : (
                                                <IoCheckmarkCircleOutline />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            title="Delete category"
                                            disabled={
                                                isUpdating || isDeleting
                                            }
                                            onClick={() => setDeleteTarget(category)}
                                        >
                                            <IoTrashOutline />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </AdminModal>

            <AdminConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => handleDelete(deleteTarget)}
                title="Delete Category"
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                confirmLabel="Delete"
                danger
            />
        </section>
    );
};

export default CategoryManagement;
