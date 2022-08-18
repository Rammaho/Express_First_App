const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Product } = require('../models');

// method to create product
const createProduct = async (productBody) => {
  try {
    const newProduct = await Product.create(productBody);
    return newProduct;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

// get all products
const getProducts = async () => {
  const products = await Product.find();
  return products;
};

// get product by id
const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// update product by id
const updateProductById = async (id, productBody) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.set(productBody);
  await product.save();
  return product;
};

// delete product by id
const deleteProductById = async (id) => {
  // delete Product by id
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
