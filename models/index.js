'use strict';
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const models = {};

require('./user')(mongoose, models);
require('./poll')(mongoose, models);

module.exports = models;
