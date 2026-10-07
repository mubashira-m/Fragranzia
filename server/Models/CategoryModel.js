const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Block", "Unblock"],
    default: "Block"
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;