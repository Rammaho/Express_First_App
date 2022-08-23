const pickrrService = require('../services/pickrr.order.service');

const placeOrder = async (req, res) => {
  const userId = req.SubjectId;
  const orderBody = req.body;
  orderBody.userId = userId;
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
