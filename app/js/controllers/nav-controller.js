'use strict';

module.exports = function(app) {

  app.controller('NavController', ['AuthService', '$window', '$location',
  function(AuthService, $window, $location) {
    let _this = this;
    _this.signedIn = false;
    _this.signedOut = true;
    _this.loginError = false;
    _this.error;
    if($window.localStorage.token) {
      _this.signedIn = true;
      _this.signedOut = false;
    }

    _this.validateLoginInput = function(username, password) {
        if(!username) {
          return 'Please enter username'
        } else if(!password) {
          return 'Pleas enter password'
        } else {
          return null;
        }
      }


    _this.signUp = function() {
      $location.path('/signup');
    };

    _this.signIn = function(user) {
      // let username;
      // let password;
      // if(!user) {
      //   username = '';
      //   password = '';
      // } else {
      //   username = user.username;
      //   password = user.password;
      // }
      // _this.loginError = false;
      // const validateLoginInput = _this.validateLoginInput(username, password);
      //
      // if(validateLoginInput) {
      //   _this.error = validateLoginInput;
      //   _this.loginError = true;
      //   return;
      // }

      if(!user || !user.username || !user.password) {
        return;
      }
      AuthService.signIn(user, (err, res) => {
        if(err) console.log(err);
        if(res.data.status == 'failure') {
          _this.error = res.data.message;
          _this.loginError = true
        } else {
          _this.userId = $window.localStorage.id = res.data.data._id;
          _this.userName = $window.localStorage.name = res.data.data.name;
          _this.signedIn = true;
          _this.signedOut = false;
          _this.loginError = false;
          $location.path('/');
        }

      });
    };

    _this.signOut = function() {
      AuthService.signOut(() => {
        $window.localStorage.removeItem('name');
        $window.localStorage.removeItem('id');
        _this.signedIn = false;
        _this.signedOut = true;
      });
    };
  }]);
};
