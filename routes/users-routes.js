'use strict';
// const jwtAuth = require('../lib/auth.js');

module.exports = (userRouter, models) => {
  const User = models.User;

  userRouter.route('/signup')
    .post((req, res) => {
      User.findOne({name: req.body.name}, (err, user) => {
        if(err) throw err;
        if(!user) {
          var newUser = new User(req.body);
          newUser.save((err, user) => {
            res.json({
              success: true,
              token: user.generateToken()
            });
          });
        } else {
          res.status(401).json({error: 'Username taken!'});
        }
      });
    });

    userRouter.route('/users')
      .get((req, res) => {
        User.find({}, (err, users) => {
          if(err) throw err;
          res.json({data:users});
        });
      });

    userRouter.route('/users/:id')
      .get((req, res) => {
        User.findOne({_id:req.params.id}, (err, user) => {
          if(err) throw err;
          res.json({data: user});
        });
      })
      .put((req, res) => {
        console.log(req.params.id);
        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
          if(err) throw err;
          res.json({message: 'Update successful!'});
        })
      })
      .delete((req, res) => {
        console.log(req.params.id);
        User.findById(req.params.id, (err, user) => {
          if(err) throw err;
          user.remove();
          res.json({data: 'User deleted!'});
        })
      })

    userRouter.route('/polls')
      .get((req, res) => {
        var polls = [];
        User.find({}, (err, users) => {
          if(err) throw err;
          users.forEach((user) => {
            user.polls.forEach((poll) => {
              polls.push(poll);
            })
          })
          res.json({data: polls});
        })
      })

    userRouter.route('/users/:id/polls')
      .get((req, res) => {
        User.findById(req.params.id, (err, user) => {
          if(err) throw err;
          res.json({data: user.polls});
        })
      })
      .post((req, res) => {
        console.log(req.body);
        User.findById(req.params.id, (err, user) => {
          if(err) throw err;
          user.polls.push(req.body);
          user.save();
          res.json({data: 'Poll added!'});
        })
      })


}
