const express = require("express");

const {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  toggleBlock
} = require("../controllers/productController");

const upload = require("../config/multer");

const router = express.Router();


// GET ALL

router.get("/", getProducts);


// GET ONE

router.get("/:id", getProduct);


// ADD PRODUCT + IMAGE

router.post(
  "/",
  upload.single("image"),
  addProduct
);


// EDIT PRODUCT

router.put(
  "/:id",
  upload.single("image"),
  editProduct
);


// DELETE

router.delete(
  "/:id",
  deleteProduct
);


// BLOCK / UNBLOCK

router.put(
  "/:id/block",
  toggleBlock
);


module.exports = router;