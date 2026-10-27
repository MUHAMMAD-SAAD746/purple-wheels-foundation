const express = require("express");
const router = express.Router();

const adminCategoryController = require(
    "../controllers/admin/adminCategory.controller"
);

router.get("/", adminCategoryController.getCategories);

module.exports = router;