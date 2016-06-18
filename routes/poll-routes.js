'use strict';
const jwtAuth = require('../lib/auth.js');

module.exports = (pollRouter, models) => {
  const Poll = models.Poll;
  const User = models.User;




  pollRouter.route('/:id/polls')
    .get((req, res) => {
      User.findOne({_id: req.params.id})
        .populate('polls')
        .exec((err, user) => {
          if(err) throw err;
          res.json({data: user.polls});
        });
    })
    .post(jwtAuth, (req, res) => {
      User.findById(req.params.id, (err, user) => {
        var newPoll = new Poll();
        newPoll._owner = user.name;
        newPoll.name = req.body.name;
        user.polls.push(newPoll._id);
        user.save((err, user) => {
          if(err) throw err;
        });
        req.body.options.forEach((opt) => {
          newPoll.options.push(opt);
        });

        newPoll.save();

        res.json({
          success: true,
          data: newPoll
        })
      })
    });

  pollRouter.route('/:id/polls/:pollId')
    .get((req, res) => {
      Poll.findById(req.params.pollId, (err, poll) => {
        if(err) throw err;
        res.json({data: poll});
      });
    })
    .put((req, res) => {
      console.log(req.ip);
      Poll.findByIdAndUpdate(req.params.pollId, req.body, (err, poll) => {
        if(err) throw err;
        res.json({message: 'Poll updated!'});
      });
    })
    .delete(jwtAuth, (req, res) => {
      Poll.findById(req.params.pollId, (err, poll) => {
        poll.remove((err, poll) => {
          User.findById(req.params.id, (err, user) => {
            user.polls.pull(poll._id);
            user.save();
          })
          res.json({message: 'Poll deleted!'});
        })
      });
    });

}
