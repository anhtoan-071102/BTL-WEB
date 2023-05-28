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

exports.getAgents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = PER_PAGE;
    const totalItems = await Agent.find().countDocuments();
    const agents = await Agent.find()
      .sort('name')
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(STATUS_CODE.ok).json({
      totalItems: totalItems,
      perPage: perPage,
      agents: agents,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getAgentIds = async (req, res, next) => {
  try {
    const agents = await Agent.find();

    const idArray = agents.map(agent => agent._id);

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
    const agents = await Agent.find();
    resAgents = agents.map(agent => {
      return {
        _id: agent._id,
        name: agent.name,
      };
    });
    res.status(STATUS_CODE.ok).json({
      agents: resAgents,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.getAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      const error = new Error('Hiện không thể xem');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    res.status(STATUS_CODE.ok).json({
      agent: agent,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};

exports.addAgent = async (req, res, next) => {
  try {
    const newAgent = new Agent({
      name: req.body.name,
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      street: req.body.street,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    });
    await newAgent.save();
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

exports.editAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      const error = new Error('Hiện không thể chỉnh sửa');
      error.statusCode = STATUS_CODE.notFound;
      throw error;
    }
    agent.name = req.body.name;
    agent.province = req.body.province;
    agent.district = req.body.district;
    agent.ward = req.body.ward;
    agent.street = req.body.street;
    agent.phoneNumber = req.body.phoneNumber;
    agent.email = req.body.email;
    await agent.save();
    res.status(STATUS_CODE.ok).json({
      agent: agent,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = STATUS_CODE.serverError;
    }
    next(error);
  }
};
