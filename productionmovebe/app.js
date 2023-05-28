const path = require('path');
const fs = require('fs');
const { DB_URL } = require('./config');

const express = require('express');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const bodyParser = require('body-parser');

const app = express();

function limit(c) {
  return this.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
}

Array.prototype.limit = limit;

function skip(c) {
  return this.filter((x, i) => {
    if (i > c - 1) {
      return true;
    }
  });
}

Array.prototype.skip = skip;

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const factoryRouter = require('./routes/factory');
const agentRouter = require('./routes/agent');
const serviceCenterRouter = require('./routes/serviceCenter');
const userRouter = require('./routes/user');
const staticRouter = require('./routes/statistic');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/factory', factoryRouter);
app.use('/agent', agentRouter);
app.use('/serviceCenter', serviceCenterRouter);
app.use('/user', userRouter);
app.use('/statistic', staticRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  if (error.filePath) {
    const filePath = path.join(__dirname, error.filePath);
    fs.unlink(filePath, err => console.log(err));
  }
  res.status(status).json({ error: error.message });
});

mongoose
  .connect(DB_URL)
  .then(result => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
