'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function(mongoose, models) {
  var Schema = mongoose.Schema;
  const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    polls: [{ type: Schema.Types.ObjectId, ref:'Poll'}]
  });

  userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
  });

  //userSchema.methods.hashPassword
  userSchema.methods.compareHash = function(password) {
    console.log('Before Vassword: '+bcrypt.hashSync(this.password, bcrypt.genSaltSync(10)));
    return bcrypt.compareSync(password, this.password);
  };

  userSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id}, 'GAME TIME');
  };

  const User = mongoose.model('User', userSchema);
  models.User = User;

};
