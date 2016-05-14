'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/voting-app');
const models = {};

require('./user')(mongoose, models);
require('./poll')(mongoose, models);

module.exports = models;
