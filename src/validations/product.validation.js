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
    reviews: Joi.array(),
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

const addProductReview = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    score: Joi.number().required(),
    description: Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

// const getProductReviewsById = {
//   params: Joi.object().keys({
//     id: Joi.string().custom(objectId),
//   }),
// };

const getProductPropertyById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
    property: Joi.string().required(),
  }),
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  addProductReview,
  // getProductReviewsById,
  getProductPropertyById,
};
