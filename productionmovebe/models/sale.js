const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    month: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    sales: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sale', saleSchema);
