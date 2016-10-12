'use strict';
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'devlopment';
var CONFIG = require(__dirname +'/../config/config.json')[env];

mongoose.connect(process.env[CONFIG.database] || CONFIG.database);
const models = {};

require('./user')(mongoose, models);
require('./poll')(mongoose, models);

module.exports = models;
