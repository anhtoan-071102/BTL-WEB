const mongoose = require('mongoose');

const { PRODUCT_STATUS } = require('../config');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productModel: {
      type: Schema.Types.ObjectId,
      ref: 'ProductModel',
    },
    productLine: {
      type: Schema.Types.ObjectId,
      ref: 'ProductLine',
    },
    productCode: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: PRODUCT_STATUS.newProduct,
    },
    factory: {
      type: Schema.Types.ObjectId,
      ref: 'Factory',
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
    },
    serviceCenter: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCenter',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
