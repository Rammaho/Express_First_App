const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    specifications: Joi.string().required(),
    howToUse: Joi.string().required(),
    image: Joi.string(),
    sourcePinCode: Joi.string(),
    sourceAddress: Joi.string(),
    deliverablePinCodes: Joi.array(),
    quantityAvailable: Joi.number().required(),
    category: Joi.string().required(),
    isActive: Joi.boolean(),
    isPromoted: Joi.boolean(),
    productReviews: Joi.array(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProductById = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    specifications: Joi.string().required(),
    howToUse: Joi.string().required(),
    image: Joi.string(),
    sourcePinCode: Joi.string(),
    sourceAddress: Joi.string(),
    deliverablePinCodes: Joi.array(),
    quantityAvailable: Joi.number().required(),
    category: Joi.string().required(),
    isActive: Joi.boolean(),
    isPromoted: Joi.boolean(),
    productReviews: Joi.array(),
  }),
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const deleteProductById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
