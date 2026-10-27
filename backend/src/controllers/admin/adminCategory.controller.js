const Category = require("../../model/category.model");
const blogModel = require("../../model/blogs.model")

async function createCategory(req, res) {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Category name is required."
            });
        }

        const trimmedName = name.trim();

        const existingCategory = await Category.findOne({
            name: {
                $regex: `^${trimmedName}$`,
                $options: "i"
            }
        });

        if (existingCategory) {
            return res.status(409).json({
                message: "Category already exists."
            });
        }

        const category = await Category.create({
            name: trimmedName
        });

        return res.status(201).json({
            message: "Category created successfully.",
            category
        });
    } catch (error) {
        console.error("Error creating category:", error);

        return res.status(500).json({
            message: "Failed to create category."
        });
    }
}



async function getCategories(req, res) {
    try {
        const categories = await Category.find({ isActive: true })
            .select("_id name")
            .sort({ name: 1 });

        return res.status(200).json({
            categories
        });
    } catch (error) {
        console.error("Error fetching categories:", error);

        return res.status(500).json({
            message: "Failed to fetch categories."
        });
    }
}




async function getAllCategories(req, res) {
    try {
        const categories = await Category.find()
            .select("_id name isActive")
            .sort({ name: 1 });

        return res.status(200).json({
            categories
        });
    } catch (error) {
        console.error("Error fetching admin categories:", error);

        return res.status(500).json({
            message: "Failed to fetch categories."
        });
    }
}




async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Category name is required."
            });
        }

        const trimmedName = name.trim().toLowerCase();

        const existingCategory = await Category.findOne({
            name: {
                $regex: `^${trimmedName}$`,
                $options: "i"
            },
            _id: { $ne: id }
        });

        if (existingCategory) {
            return res.status(409).json({
                message: "Category already exists."
            });
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { name: trimmedName },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        return res.status(200).json({
            message: "Category updated successfully.",
            category
        });
    } catch (error) {
        console.error("Error updating category:", error);

        return res.status(500).json({
            message: "Failed to update category."
        });
    }
}




async function deactivateCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        return res.status(200).json({
            message: "Category deactivated successfully.",
            category
        });
    } catch (error) {
        console.error("Error deactivating category:", error);

        return res.status(500).json({
            message: "Failed to deactivate category."
        });
    }
}



async function activateCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        return res.status(200).json({
            message: "Category activated successfully.",
            category
        });
    } catch (error) {
        console.error("Error activating category:", error);

        return res.status(500).json({
            message: "Failed to activate category."
        });
    }
}



async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        const existingBlog = await blogModel.exists({
            category: category.name
        });

        if (existingBlog) {
            return res.status(409).json({
                message: "This category is used by existing blogs. Deactivate it instead."
            });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Category deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting category:", error);

        return res.status(500).json({
            message: "Failed to delete category."
        });
    }
}



module.exports = {
    createCategory,
    getCategories,
    getAllCategories,
    updateCategory,
    deactivateCategory,
    activateCategory,
    deleteCategory
};