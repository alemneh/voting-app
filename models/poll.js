'use strict';

module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  const pollSchema = new mongoose.Schema({
    _owner: [{type: String, ref: 'Student'}],
    name: String,
    options: []
  });

  const Poll = mongoose.model('Poll', pollSchema);
  models.Poll = Poll;
};
