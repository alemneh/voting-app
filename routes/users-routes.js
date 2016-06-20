'use strict';
const jwtAuth = require('../lib/auth.js');

module.exports = (userRouter, models) => {
  const User = models.User;
  const Poll = models.Poll;

  userRouter.route('/signup')
    .post((req, res) => {
      User.findOne({name: req.body.name}, (err, user) => {
        if(err) throw err;
        if(!user) {
          var newUser = new User(req.body);
          newUser.save((err, user) => {
            res.json({
              data: user,
              token: user.generateToken()
            });
          });
        } else {
          res.status(401).json({error: 'Username taken!'});
        }
      });
    });

  userRouter.route('/polls')
      .get((req, res) => {
        Poll.find({}, (err, polls) => {
          if(err) throw err;
          res.json({data: polls});
        });
      })

  userRouter.route('/polls/:id')
      .get((req, res) => {
        Poll.findById(req.params.id, (err, poll) => {
          if(err) throw err;
          res.json({data: poll});
        });
      })
      .put((req, res) => {
        console.log(req.ip);
        Poll.findByIdAndUpdate(req.params.id, req.body, (err, poll) => {
          if(err) throw err;
          res.json({
            message: 'Poll updated!',
            ip: req.ip
          });
        });
      })
      .delete(jwtAuth, (req, res) => {
        Poll.findById(req.params.id, (err, poll) => {
          poll.remove((err, poll) => {
            User.findById(req.params.id, (err, user) => {
              user.polls.pull(poll._id);
              user.save();
            })
            res.json({message: 'Poll deleted!'});
          })
        });
      });

    userRouter.route('/users')
      .get(jwtAuth, (req, res) => {
        User.find({}, (err, users) => {
          if(err) throw err;
          res.json({data:users});
        });
      });

    userRouter.route('/users/:id')
      .get(jwtAuth, (req, res) => {
        User.findOne({_id:req.params.id}, (err, user) => {
          console.log(err);
          if(err) throw err;
          res.json({data: user});
        });
      })
      .put(jwtAuth, (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
          if(err) throw err;
          res.json({message: 'Update successful!'});
        });
      })
      .delete(jwtAuth, (req, res) => {
        User.findById(req.params.id, (err, user) => {
          user.polls.forEach((poll) => {
            Poll.findById(poll, (err, data) => {
              if(err) throw err;
              data.remove();
            })
          })
          user.remove((err, user) => {
            if(err) throw err;
            res.json({message: 'User removed!'});
          });
        });
      });



}
