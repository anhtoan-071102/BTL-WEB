const User = require('../models/user');
const Account = require('../models/account');
const Customer = require('../models/customer');
const Factory = require('../models/factory');
const Product = require('../models/product');
const ProductLine = require('../models/productLine');
const ProductModel = require('../models/productModel');
const ServiceCenter = require('../models/serviceCenter');

const { STATUS_CODE, SECRET_KEY } = require('../config');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postLogin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const account = await Account.findOne({
      username: username,
    });
    if (!account) {
      const error = new Error('Tên đăng nhập hoặc mật khẩu chưa đúng');
      error.statusCode = STATUS_CODE.unauthorized;
      throw error;
    }
    const isMatchPw = await bcrypt.compare(password, account.password);
    if (!isMatchPw) {
      const error = new Error('Tên đăng nhập hoặc mật khẩu chưa đúng');
      error.statusCode = STATUS_CODE.unauthorized;
      throw error;
    }
    const user = await User.findById(account.user);
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    res.status(STATUS_CODE.ok).json({
      token: token,
      role: user.role,
      userId: user._id.toString(),
      userImage: user.imageUrl,
      userName: user.name,
      factory: user.factory,
      agent: user.agent,
      serviceCenter: user.serviceCenter,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error('Người dùng này không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    user.status = 'Quên mật khẩu';
    await user.save();
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
