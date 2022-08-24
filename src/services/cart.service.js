const Cart = require('../models/cart.model');

const addToCart = async (userId, productId, packageId) => {
  let cart;
  cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await new Cart({
      userId,
    });
  }
  if (productId) {
    cart.products.push(productId);
  }
  if (packageId) {
    cart.packages.push(packageId);
  }
  const newCart = await cart.save();
  return newCart;
};

const removeFromCart = async (userId, productId, packageId) => {
  const cart = await Cart.findOne({ userId });
  const productIndex = cart.products.indexOf(productId);
  const packageIndex = cart.packages.indexOf(packageId);
  // remove product from cart
  if (productIndex !== -1) {
    // cart.products = cart.products.filter(id => id !== productId);
    cart.products.splice(productIndex, 1);
  }
  // remove package from cart
  if (packageIndex !== -1) {
    // cart.packages = cart.packages.filter(id => id !== packageId);
    cart.packages.splice(packageIndex, 1);
  }
  const newCart = await cart.save();
  return newCart;
};

const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return;
  }
  return cart;
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
