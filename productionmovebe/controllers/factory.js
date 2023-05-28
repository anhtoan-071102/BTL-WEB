const User = require('../models/user');
const Account = require('../models/account');
const Customer = require('../models/customer');
const Factory = require('../models/factory');
const Product = require('../models/product');
const ProductLine = require('../models/productLine');
const ProductModel = require('../models/productModel');
const ServiceCenter = require('../models/serviceCenter');

const { PER_PAGE, STATUS_CODE, HOST_NAME } = require('../config');

const randomString = require('randomstring');

exports.getFactories = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const totalItems = await Factory.find().countDocuments();
    const factories = await Factory.find()
      .sort('name')
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: totalItems,
      perPage: perPage,
      factories: factories,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getFactoryIds = async (req, res, next) => {
  try {
    const factories = await Factory.find();

    const idArray = factories.map(factory => factory._id);

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
    const factories = await Factory.find();
    resFactories = factories.map(factory => {
      return {
        _id: factory._id,
        name: factory.name,
      };
    });
    res.status(STATUS_CODE.ok).json({
      factories: resFactories,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getFactory = async (req, res, next) => {
  try {
    const factory = await Factory.findById(req.params.factoryId);
    if (!factory) {
      const error = new Error('Hiện không thể xem');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    res.status(STATUS_CODE.ok).json({
      factory: factory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addFactory = async (req, res, next) => {
  try {
    const newFactory = new Factory({
      name: req.body.name,
      factoryCode: randomString.generate(6).toUpperCase(),
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      street: req.body.street,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    });
    await newFactory.save();
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

exports.editFactory = async (req, res, next) => {
  try {
    const factory = await Factory.findById(req.params.factoryId);
    if (!factory) {
      const error = new Error('Hiện không thể chỉnh sửa');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    factory.name = req.body.name;
    factory.province = req.body.province;
    factory.district = req.body.district;
    factory.ward = req.body.ward;
    factory.street = req.body.street;
    factory.phoneNumber = req.body.phoneNumber;
    factory.email = req.body.email;
    await factory.save();
    res.status(STATUS_CODE.ok).json({
      factory: factory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};
