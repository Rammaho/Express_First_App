const Joi = require ('joi');
const { objectId } = require ('./custom.validation');

const createPackage = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        specifications: Joi.string().required(),
        howToUse: Joi.string().required(),
        sourcePinCodes: Joi.string(),
        sourceAddress: Joi.string(),
        deliverablePinCodes: Joi.array(),
        quantityAvailable: Joi.number().required(),
        category: Joi.string().required(),
        isActive: Joi.boolean(),
        isPromoted: Joi.boolean(),
    }),
};


const getPackageById = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };


  const updatePackageById ={
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        specifications: Joi.string().required(),
        howToUse: Joi.string().required(),
        sourcePinCodes: Joi.string(),
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

const deletePackagetById = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };


  module.exports = {
    createPackage,
    getPackageById,
    updatePackageById,
    deletePackagetById,
  };