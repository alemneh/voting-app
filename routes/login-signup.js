'use strict';

module.exports = (loginRouter, models) => {
  const User = models.User;

  loginRouter.route('/login')
    .get((req, res) => {
      const authorizationArray = req.headers.authorization.split(' ');
      const method = authorizationArray[0];
      const base64ed = authorizationArray[1];
      const authArray = new Buffer(base64ed, 'base64').toString().split(':');
      const name = authArray[0];
      const password = authArray[1];
      User.findOne({name:name}, (err, user) => {
        if(err) throw err;
        if(!user) {
          return res.json({status: 'failure', message: 'Invalid User!'});
        }
        const valid = user.compareHash(password);

        if(!valid) {
          res.json({status: 'failure', message: 'Wrong password'});
        } else {
          res.json({
            data: user,
            token: user.generateToken()
          });
        }
      });
    });
};
