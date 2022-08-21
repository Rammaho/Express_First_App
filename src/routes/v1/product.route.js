const express = require('express');
// const auth = require('../../middlewares/auth');
const { authUser, authAdmin } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router.route('/').post(authAdmin(), validate(productValidation.createProduct), productController.createProduct);

router.route('/').get(authUser(), productController.getProducts);

router.route('/:id').get(authUser(), validate(productValidation.getProductById), productController.getProductById);

router.route('/:id').patch(authAdmin(), validate(productValidation.updateProductById), productController.updateProductById);

router.route('/:id').delete(authAdmin(), validate(productValidation.deleteProductById), productController.deleteProductById);

// post review to product
router
  .route('/:id/reviews')
  .post(authUser(), validate(productValidation.addProductReview), productController.addProductReview);

// router
//   .route('/:id/reviews')
//   .get(authUser(), validate(productValidation.getProductReviewsById), productController.getProductReviewsById);

// get product property
router.route('/:id/:property').get(authUser(), productController.getProductPropertyById);

// update product property
router
  .route('/:id/:property')
  .patch(authAdmin(), validate(productValidation.updateProductPropertyById), productController.updateProductPropertyById);

// get products by property
router
  .route('/:property/:value')
  .get(authUser(), validate(productValidation.getProductsByProperty), productController.getProductsByProperty);

module.exports = router;
