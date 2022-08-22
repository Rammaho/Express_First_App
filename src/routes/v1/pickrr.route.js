const express = require('express');
// const auth = require('../../middlewares/auth');
const { authUser } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { pickrrValidation } = require('../../validations');
const { pickrrController } = require('../../controllers');

const router = express.Router();

router.post('/place-order', authUser(), validate(pickrrValidation.placeOrder), pickrrController.placeOrder);
router.post(
  '/check-pincode-service',
  authUser(),
  validate(pickrrValidation.checkPincodeService),
  pickrrController.checkPincodeService
);

module.exports = router;
