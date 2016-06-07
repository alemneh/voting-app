'use strict';

module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  const pollSchema = new mongoose.Schema({
    _owner: [{type: String, ref: 'Student'}],
    name: String,
    date: {type: Date, default: Date.now}, 
    options: []
  });

  const Poll = mongoose.model('Poll', pollSchema);
  models.Poll = Poll;
};
