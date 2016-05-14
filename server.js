'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const models = require('./models');
const loginRouter = express.Router();
const userRouter = express.Router();
const pollRouter = express.Router();

require('./routes/users-routes')(userRouter, models);
require('./routes/poll-routes')(pollRouter, models);


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', userRouter);
app.use('/users', pollRouter);


app.listen(3000, () => {console.log('port up on 3000');});
