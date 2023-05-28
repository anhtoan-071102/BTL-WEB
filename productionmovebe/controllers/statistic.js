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

exports.getMonths = async (req, res, next) => {
  try {
    const sales = await Sale.find();
    const months = sales.map(sale => {
      return {
        month: sale.month,
        year: sale.year,
      };
    });
    res.status(STATUS_CODE.ok).json({
      months: months,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getQuantity = async (req, res, next) => {
  try {
    const month = Number(req.query.month) + 1;
    const year = Number(req.query.year) + 1;
    const quantity = await Product.find({
      createdAt: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, month, 30),
      },
    }).countDocuments();
    res.status(STATUS_CODE.ok).json({
      quantity: quantity,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};
