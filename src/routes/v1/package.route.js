const express = require ('express');

const validate = require('../../middlewares/validate');
const { packageController } = require('../../controllers');
const { packageValidation } = require('../../validations');

const router = express.Router();

router.route('/').post(validate(packageValidation.createPackage), packageController.createPackage);

router.route('/').get(packageController.getPackages);

router.route('/:id').get(validate(packageValidation.getPackageById), packageController.getPackageById);

router.route('/:id').patch(validate(packageValidation.updatePackage), packageController.updatePackageById);

router.route('/:id').delete(validate(packageValidation.deletePackage), packageController.deletePackageById);


module.exports = router;