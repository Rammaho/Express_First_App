const express = require('express');
const cartController = require('../../controllers/cart.controller');
const packageValidation = require('../../validations/cart.validation');
const { authUser } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

// route to add a product/package to cart
router.route('/').post(authUser(), validate(packageValidation.addToCart), cartController.addToCart);

// route to remove a product/package from cart
router.route('/').delete(authUser(), validate(packageValidation.removeFromCart), cartController.removeFromCart);

// route to get cart
router.route('/').get(authUser(), cartController.getCart);

module.exports = router;
