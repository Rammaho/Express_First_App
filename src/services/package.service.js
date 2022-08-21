const httpStatus = require('http-status');
const ApiError = require('../utils/Apierror');
const { Package } = require('../models');

const createPackage = async (packageBody) => {
  try {
    const newPackage = await Package.create(packageBody);
    return newPackage;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

// getting all packages
const getPackages = async () => {
  const packages = await Package.find();
  return packages;
};

// get package by id
const getPackageById = async (id) => {
  const package = await Package.findById(id);
  return package;
};

// update package by id
const updatePackageById = async (id, packageBody) => {
  const package = await Package.findById(id);
  if (!package) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  await package.set(packageBody);
  await package.save();
  return package;
};

// delete package by id
const deletePackageById = async (id) => {
  const package = await Package.findById(id);
  if (!package) {
    throw new ApiError(httpStatus.NOT_FOUND, ' package not found');
  }
  await package.remove();
  return package;
};

// adding package review

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackageById,
  deletePackageById,
};
