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

const { PER_PAGE, STATUS_CODE, HOST_NAME } = require('../config');

const randomString = require('randomstring');
const bcryptjs = require('bcryptjs');

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bokimtan123@gmail.com',
    pass: 'srxgbiylbyegamsl',
  },
});

exports.getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const totalItems = await User.find().countDocuments();
    const users = await User.find()
      .sort('name')
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(STATUS_CODE.ok).json({
      totalItems: totalItems,
      perPage: perPage,
      users: users,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getUserIds = async (req, res, next) => {
  try {
    const users = await User.find();
    const userIds = users.map(user => user._id);

    res.status(STATUS_CODE.ok).json({
      userIds: userIds,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('Người dùng không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    res.status(STATUS_CODE.ok).json({
      user: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const account = await Account.findOne({ username: req.body.username });
    if (account) {
      const error = new Error('Tên đăng nhập đã tồn tại');
      error.statusCode = 400;
      throw error;
    }
    const newUser = new User({
      name: req.body.name,
      imageUrl: `${HOST_NAME}/images/users/${req.file.filename}`,
      role: req.body.role,
      factory: req.body.factory || null,
      agent: req.body.agent || null,
      serviceCenter: req.body.serviceCenter || null,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    });
    await newUser.save();
    const hashedPw = await bcryptjs.hash(req.body.password, 12);
    const newAccount = new Account({
      username: req.body.username,
      password: hashedPw,
      user: newUser._id,
    });
    await newAccount.save();
    res.status(STATUS_CODE.ok).json({
      message: 'ok',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    if (req.file) error.filePath = `images/users/${req.file.filename}`;
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('Người dùng này không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.role = req.body.role;
    user.factory = req.body.factory || null;
    user.agent = req.body.agent || null;
    user.serviceCenter = req.body.serviceCenter || null;
    await user.save();
    res.status(STATUS_CODE.ok).json({
      user: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.editUserImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('Người dùng này không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    clearFile(`images/users/${user.imageUrl.split('/').at(-1)}`);
    user.imageUrl = `${HOST_NAME}/images/users/${req.file.filename}`;
    await user.save();
    res.status(STATUS_CODE.ok).json({
      user: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.editPassword = async (req, res, next) => {
  try {
    const account = await Account.findOne({ user: userId });
    if (!account) {
      const error = new Error('Tài khoản này không tồn tại');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    const hashedPw = await bcryptjs.hash(req.body.password, 12);
    account.password = hashedPw;
    await account.save();
    await transporter.sendMail({
      from: 'bokimtan123@gmail.com',
      to: user.email,
      subject: 'Password reset',
      html: `<p>Check your new password:</p><h1>${req.body.password}</h1>`,
    });
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

const clearFile = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
