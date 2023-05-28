const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productLineSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    productModels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductModel',
      },
    ],
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductLine', productLineSchema);
