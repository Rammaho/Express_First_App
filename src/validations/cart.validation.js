const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addToCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    packageId: Joi.string().custom(objectId),
  }),
};

const removeFromCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    packageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addToCart,
  removeFromCart,
};
