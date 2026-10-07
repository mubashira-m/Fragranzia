const Category = require("../Models/CategoryModel");

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ADD CATEGORY
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const newCategory = new Category({
      name: name,
      description: description,
      status: "Block"
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// EDIT CATEGORY
const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.status(200).json(updatedCategory);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// BLOCK / UNBLOCK CATEGORY
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    if (category.status === "Block") {
      category.status = "Unblock";
    } else {
      category.status = "Block";
    }

    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.status(200).json({
      message: "Category deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  getCategories,
  addCategory,
  editCategory,
  updateStatus,
  deleteCategory
};