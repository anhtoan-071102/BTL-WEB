const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const factorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    factoryCode: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    ward: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Factory', factorySchema);
