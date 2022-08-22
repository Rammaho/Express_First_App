const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
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
  const newPackage = await Package.findById(id);
  return newPackage;
};

// update package by id
const updatePackageById = async (id, packageBody) => {
  const newPackage = await Package.findById(id);
  if (!newPackage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  await newPackage.set(packageBody);
  await newPackage.save();
  return newPackage;
};

// delete package by id
const deletePackageById = async (id) => {
  const newPackage = await Package.findById(id);
  if (!newPackage) {
    throw new ApiError(httpStatus.NOT_FOUND, ' package not found');
  }
  await newPackage.remove();
  return newPackage;
};

// adding package review

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackageById,
  deletePackageById,
};
