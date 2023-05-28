const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModelSchema = new Schema(
  {
    modelCode: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    productLine: {
      type: Schema.Types.ObjectId,
      ref: 'ProductLine',
    },
    imageUrl: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
    },
    warrantyPeriod: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductModel', productModelSchema);
