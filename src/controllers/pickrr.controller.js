const { pickrrService } = require('../services');

const placeOrder = async (req, res) => {
  const orderBody = req.body;
  const response = await pickrrService.placeOrder(orderBody);
  if (!response) {
    res.status(400).json({
      status_code: 1106,
      err: 'KYC not done. Please complete your KYC',
    });
  } else {
    res.status(200).json({ response });
  }
};
const checkPincodeService = async (req, res) => {
  const response = await pickrrService.checkPincodeService(req.body.from_pincode, req.body.to_pincode);
  res.status(200).json({ response });
};

module.exports = {
  placeOrder,
  checkPincodeService,
};
