const express = require("express");

const {
  getCategories,
  addCategory,
  editCategory,
  updateStatus,
  deleteCategory
} = require("../Controllers/categoryController");

const router = express.Router();

router.get("/", getCategories);

router.post("/", addCategory);

router.put("/:id", editCategory);

router.put("/:id/status", updateStatus);

router.delete("/:id", deleteCategory);

module.exports = router;