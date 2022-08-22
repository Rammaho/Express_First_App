const Joi = require('joi');

const placeOrder = {
  body: Joi.object().keys({
    item_name: Joi.any().required(),
    item_list: Joi.any().required(),
    from_name: Joi.any().required(),
    from_phone_number: Joi.any().required(),
    from_address: Joi.any().required(),
    from_pincode: Joi.any().required(),
    to_name: Joi.any().required(),
    to_phone_number: Joi.any().required(),
    to_pincode: Joi.any().required(),
    to_address: Joi.any().required(),
    invoice_value: Joi.number().required(),
    cod_amount: Joi.number().required(),
  }),
};

const checkPincodeService = {
  body: Joi.object().keys({
    from_pincode: Joi.any().required(),
    to_pincode: Joi.any().required(),
  }),
};

module.exports = {
  placeOrder,
  checkPincodeService,
};
