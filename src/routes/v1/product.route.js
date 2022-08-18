const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router.route('/').post(validate(productValidation.createProduct), productController.createProduct);

router.route('/').get(productController.getProducts);

router.route('/:id').get(validate(productValidation.getProductById), productController.getProductById);

router.route('/:id').patch(validate(productValidation.updateProduct), productController.updateProductById);

router.route('/:id').delete(validate(productValidation.deleteProduct), productController.deleteProductById);

module.exports = router;
