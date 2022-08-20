const httpStatus = require('http-status');
const ApiError = require ('../utils/ApiError');
const catchAsync = require ('../utils/catchAsync');
const { packageService } = require ('../services');

const createPackage = catchAsync (async (req, res) => {
    const package = await packageService.createPackage(req.body);
    res.status(httpStatus.CREATED).json({message: 'package created successfully', data:package});
});

const getPackages = catchAsync (async (req, res) => {
    const packages = await packageService.getPackages();
    res.status(httpStatus.OK).json({message: 'packages retrived seccessfully', data: packages});
    
});
const getPackageById = catchAsync(async (req, res) =>{
    const package = await packageService.getPackageById(req.params.id);
    if (!package){
        throw new ApiError(httpStatus.NOT_FOUND, 'package not found');
    }
    res.status(httpStatus.OK).json({message: 'package retrived successfully', data: package});
});

const updatePackageById =catchAsync(async (req,res) =>{
    const package = await packageService.updatePackageById(req.params.id, req.body);
    if(!package){
        throw new ApiError(httpStatus.NOT_FOUND, 'package not found');

    }
    res.status(httpStatus.OK).json({message: 'package updated successfully', data: package});

});

const deletePackageById = catchAsync(async (req, res) => {
    try {
        const package = await packageService.deletePackageById(req.params.id);
        res.status(httpStatus.OK).json({message: 'package deleted successfully', data: package});
    }
    catch(error){
        throw new ApiError (httpStatus.BAD_REQUEST, error.message);
    }
});

// const addPackageReview

// const getPackageReviewById...



module.exports= {
    createPackage,
    getPackages,
    getPackageById,
    updatePackageById,
    deletePackageById
};
