const Product = require("../models/ProductModels");


// GET PRODUCTS

const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ADD PRODUCT

const addProduct = async (req, res) => {

  try {

    const {
      name,
      category,
      price,
      salePrice,
      stock,
      description
    } = req.body;


    const product = new Product({

      name,

      category,

      price,

      salePrice,

      stock,

      description,

      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : ""

    });


    const savedProduct = await product.save();


    res.status(201).json(savedProduct);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// EDIT PRODUCT
const editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
    } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};// BLOCK / UNBLOCK
const toggleBlock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.blocked = !product.blocked;

    await product.save();
 res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// GET ONE PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT

const deleteProduct = async (req, res) => {

  try {

    const product =
      await Product.findByIdAndDelete(req.params.id);


    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.status(200).json({
      message: "Product deleted successfully"
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  getProduct,
  toggleBlock,
  editProduct
};