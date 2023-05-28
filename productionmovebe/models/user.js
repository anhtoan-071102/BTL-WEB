const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
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
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: 'Kích hoạt',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
