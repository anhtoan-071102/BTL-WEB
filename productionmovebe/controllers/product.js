const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const User = require('../models/user');
const Account = require('../models/account');
const Agent = require('../models/agent');
const Customer = require('../models/customer');
const Factory = require('../models/factory');
const Product = require('../models/product');
const ProductLine = require('../models/productLine');
const ProductModel = require('../models/productModel');
const ServiceCenter = require('../models/serviceCenter');
const Sale = require('../models/sale');

const {
  PER_PAGE,
  STATUS_CODE,
  HOST_NAME,
  PRODUCT_STATUS,
} = require('../config');

const randomString = require('randomstring');

exports.getProductLines = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const totalItems = await ProductLine.find().countDocuments();
    const productLines = await ProductLine.find()
      .sort('name')
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: totalItems,
      perPage: perPage,
      productLines: productLines,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getProductLineIds = async (req, res, next) => {
  try {
    const productLines = await ProductLine.find();

    const idArray = productLines.map(productLine => productLine._id);

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

exports.addProductline = async (req, res, next) => {
  try {
    const newProductLine = new ProductLine({
      name: req.body.name,
      description: req.body.description,
      productModels: [],
    });
    await newProductLine.save();
    res.status(STATUS_CODE.ok).json({
      message: 'Created new product line',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.editProductLine = async (req, res, next) => {
  try {
    const productLine = await ProductLine.findById(req.params.productLineId);
    if (!productLine) {
      const error = new Error('Dòng sản phẩm này hiện không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    productLine.name = req.body.name;
    productLine.description = req.body.description;
    await productLine.save();
    res.status(STATUS_CODE.ok).json({
      productLine: productLine,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getProductModels = async (req, res, next) => {
  try {
    const productModels = await ProductModel.find({
      productLine: req.params.productLineId,
    }).sort('name');
    res.status(STATUS_CODE.ok).json({
      productModels: productModels,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addProductModels = async (req, res, next) => {
  try {
    const productLineId = req.params.productLineId;
    const modelName = req.body.name;
    const modelCode = req.body.modelCode;
    const price = Number(req.body.price);
    const warrantyPeriod = Number(req.body.warrantyPeriod);
    const productLine = await ProductLine.findById(productLineId);
    const newProductModel = new ProductModel({
      modelCode: modelCode,
      name: modelName,
      imageUrl: `${HOST_NAME}/images/products/${req.file.filename}`,
      productLine: productLineId,
      price: price,
      warrantyPeriod: warrantyPeriod,
    });
    productLine.productModels.push(newProductModel._id);
    await newProductModel.save();
    await productLine.save();
    res.status(STATUS_CODE.ok).json({
      message: 'ok',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    if (req.file) error.filePath = `images/products/${req.file.filename}`;
    next(error);
  }
};

exports.editProductModel = async (req, res, next) => {
  try {
    const productModel = await ProductModel.findById(req.params.productModelId);
    if (!productModel) {
      const error = new Error('Hiện không thể chỉnh sửa');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    productModel.name = req.body.name;
    productModel.price = req.body.price;
    productModel.warrantyPeriod = req.body.warrantyPeriod;
    await productModel.save();
    res.status(STATUS_CODE.ok).json({
      productModel: productModel,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.editProductModelImage = async (req, res, next) => {
  try {
    const productModel = await ProductModel.findById(req.params.productModelId);
    if (!productModel) {
      const error = new Error('Hiện không thể chỉnh sửa');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    clearFile(`images/products/${productModel.imageUrl.split('/').at(-1)}`);
    productModel.imageUrl = `${HOST_NAME}/images/products/${req.file.filename}`;
    await productModel.save();
    res.status(STATUS_CODE.ok).json({
      productModel: productModel,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    if (req.file) error.filePath = `images/products/${req.file.filename}`;
    next(error);
  }
};

exports.getFactoryWarehouse = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const factory = await Factory.findById(req.params.factoryId)
      .populate({
        path: 'products',
        model: 'Product',
        populate: {
          path: 'productModel',
          model: 'ProductModel',
        },
      })
      .populate({
        path: 'products',
        model: 'Product',
        populate: {
          path: 'productLine',
          model: 'ProductLine',
        },
      })
      .exec();
    if (!factory) {
      const error = new Error('Nhà kho không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    const products = factory.products
      .sort((a, b) =>
        a.productModel.name > b.productModel.name
          ? 1
          : b.productModel.name > a.productModel.name
          ? -1
          : 0
      )
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: factory.products.length,
      perPage: perPage,
      products: products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getAgentWarehouse = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const agent = await Agent.findById(req.params.agentId)
      .populate({
        path: 'products',
        model: 'Product',
        populate: {
          path: 'productModel',
          model: 'ProductModel',
        },
      })
      .populate({
        path: 'products',
        model: 'Product',
        populate: {
          path: 'productLine',
          model: 'ProductLine',
        },
      })
      .exec();
    if (!agent) {
      const error = new Error('Nhà kho không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    const products = agent.products.skip((page - 1) * perPage).limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: agent.products.length,
      perPage: perPage,
      products: products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getServiceCenterWarehouse = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const serviceCenter = await ServiceCenter.findById(
      req.params.serviceCenterId
    )
      .populate({
        path: 'products',
        model: 'Product',
        populate: {
          path: 'productModel',
          model: 'ProductModel',
        },
      })
      .populate({
        path: 'products',
        model: 'Product',
        populate: {
          path: 'productLine',
          model: 'ProductLine',
        },
      })
      .exec();
    if (!serviceCenter) {
      const error = new Error('Nhà kho không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    const products = serviceCenter.products
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: serviceCenter.products.length,
      perPage: perPage,
      products: products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addFactoryProducts = async (req, res, next) => {
  try {
    const factory = await Factory.findById(req.params.factoryId);
    const _productLine = await ProductLine.findById(req.body.productLine);
    const _productModel = await ProductModel.findById(req.body.productModel);
    const arr = new Array(Number(req.body.quantity)).fill(0);
    await Promise.all(
      arr.map(async el => {
        const newProduct = new Product({
          productLine: _productLine._id,
          productModel: _productModel._id,
          productCode: `${factory.factoryCode}-${
            _productModel.modelCode
          }-${randomString.generate(5)}`,
          factory: factory._id,
          agent: null,
          serviceCenter: null,
          customer: null,
        });
        console.log(newProduct._id);
        factory.products.push(newProduct._id);
        return await newProduct.save();
      })
    );
    _productLine.quantity += arr.length;
    _productModel.quantity += arr.length;
    await _productLine.save();
    await _productModel.save();
    factory.totalProducts += arr.length;
    await factory.save();

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

exports.getAllPdlNameAndId = async (req, res, next) => {
  try {
    const productLines = await ProductLine.find();
    const resPdls = productLines.map(pdl => {
      return {
        _id: pdl._id,
        name: pdl.name,
      };
    });
    res.status(STATUS_CODE.ok).json({
      productLines: resPdls,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getAllModelsNameAndIdByPdl = async (req, res, next) => {
  try {
    const productModels = await ProductModel.find({
      productLine: req.params.productLineId,
    });
    const resPms = productModels.map(pm => {
      return {
        _id: pm._id,
        name: pm.name,
      };
    });
    res.status(STATUS_CODE.ok).json({
      productModels: resPms,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getAllProductId = async (req, res, next) => {
  try {
    const factory = await Factory.findById(req.params.factoryId);

    res.status(STATUS_CODE.ok).json({
      productIds: factory.products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addAgentProducts = async (req, res, next) => {
  try {
    const factory = await Factory.findById(req.body.factory);
    const agent = await Agent.findById(req.params.agentId);
    const productIds = JSON.parse(req.body.productIds);
    console.log(productIds);
    await Promise.all(
      productIds.map(async id => {
        const product = await Product.findById(id);
        product.agent = agent._id;
        product.status = PRODUCT_STATUS.inAgent;
        agent.products.push(id);
        factory.products.pull(id);
        await agent.save();
        return await product.save();
      })
    );
    await factory.save();

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

exports.getProductLine = async (req, res, next) => {
  try {
    const productLine = await ProductLine.findById(req.params.productLineId);
    if (!productLine) {
      const error = new Error('Không tìm thấy dữ liệu');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    res.status(STATUS_CODE.ok).json({
      productLine: productLine,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

const clearFile = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
