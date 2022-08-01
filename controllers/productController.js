const Product = require("../models/productModel")

// ** ===================  CREATE PRODUCT        ===================
const createProduct = async (req, res) => {
  res.send("Create product")
}

// ** ===================  GET ALL PRODUCTS      ===================
const getAllProducts = async (req, res) => {
  res.send("Get all products")
}

// ** ===================  GET SINGLE PRODUCT    ===================
const getSingleProduct = async (req, res) => {
  res.send("Get single product")
}

// ** ===================  UPDATE PRODUCT        ===================
const updateProduct = async (req, res) => {
  res.send("Update product")
}

// ** ===================  DELETE PRODUCT        ===================
const deleteProduct = async (req, res) => {
  res.send("Delete product")
}

// ** ===================  UPLOAD IMAGE PRODUCT  ===================
const uploadImage = async (req, res) => {
  res.send("Upload prodct")
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
