const Settings = require("../../model/settings.model");

async function updateBlogApprovalMode(req, res) {
    try {
        const { value } = req.body;

        if (!["pending", "approved"].includes(value)) {
            return res.status(400).json({
                success: false,
                message: "Value must be pending or approved"
            });
        }

        const setting = await Settings.findOneAndUpdate(
            { key: "blogApprovalMode" },
            { $set: { value } },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Blog approval mode updated successfully",
            setting
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update blog approval mode",
            error: error.message
        });
    }
}



async function getBlogApprovalMode(req, res) {
    try {
        const setting = await Settings.findOne({
            key: "blogApprovalMode"
        });

        return res.status(200).json({
            success: true,
            value: setting?.value || "approved"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blog approval mode"
        });
    }
}



module.exports = {
    updateBlogApprovalMode,
    getBlogApprovalMode
};