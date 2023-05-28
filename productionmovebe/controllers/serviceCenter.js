const User = require('../models/user');
const Account = require('../models/account');
const Agent = require('../models/agent');
const Customer = require('../models/customer');
const Factory = require('../models/factory');
const Product = require('../models/product');
const ProductLine = require('../models/productLine');
const ProductModel = require('../models/productModel');
const ServiceCenter = require('../models/serviceCenter');

const { PER_PAGE, STATUS_CODE, HOST_NAME } = require('../config');

const randomString = require('randomstring');

exports.getServiceCenters = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const totalItems = await ServiceCenter.find().countDocuments();
    const serviceCenters = await ServiceCenter.find()
      .sort('name')
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: totalItems,
      perPage: perPage,
      serviceCenters: serviceCenters,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getServiceCenterIds = async (req, res, next) => {
  try {
    const serviceCenters = await ServiceCenter.find();

    const idArray = serviceCenters.map(sc => sc._id);

    res.status(STATUS_CODE.ok).json({
      idArray: idArray,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getNamesAndIds = async (req, res, next) => {
  try {
    const serviceCenters = await ServiceCenter.find();
    resServiceCenters = serviceCenters.map(serviceCenter => {
      return {
        _id: serviceCenter._id,
        name: serviceCenter.name,
      };
    });
    res.status(STATUS_CODE.ok).json({
      serviceCenters: resServiceCenters,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getServiceCenter = async (req, res, next) => {
  try {
    const serviceCenter = await ServiceCenter.findById(
      req.params.serviceCenterId
    );
    if (!serviceCenter) {
      const error = new Error('Hiện không thể xem');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    res.status(STATUS_CODE.ok).json({
      serviceCenter: serviceCenter,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addServiceCenter = async (req, res, next) => {
  try {
    const newServiceCenter = new ServiceCenter({
      name: req.body.name,
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      street: req.body.street,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    });
    await newServiceCenter.save();
    res.status(STATUS_CODE.ok).json({
      message: 'ok',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.editServiceCenter = async (req, res, next) => {
  try {
    const serviceCenter = await ServiceCenter.findById(
      req.params.serviceCenterId
    );
    if (!serviceCenter) {
      const error = new Error('Hiện không thể chỉnh sửa');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    serviceCenter.name = req.body.name;
    serviceCenter.province = req.body.province;
    serviceCenter.district = req.body.district;
    serviceCenter.ward = req.body.ward;
    serviceCenter.street = req.body.street;
    serviceCenter.phoneNumber = req.body.phoneNumber;
    serviceCenter.email = req.body.email;
    await serviceCenter.save();
    res.status(STATUS_CODE.ok).json({
      serviceCenter: serviceCenter,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};
