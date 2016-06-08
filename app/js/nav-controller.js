'use strict';

module.exports = function(app) {

  app.controller('NavController', ['AuthService', '$window', '$location',
  function(AuthService, $window, $location) {
    let _this = this;
    _this.signedIn = false;
    _this.signedOut = true;
    if($window.localStorage.token) {
      _this.signedIn = true;
      _this.signedOut = false;
    }

    _this.signUp = function() {
      $location.path('/signup');
    };

    _this.signIn = function(user) {
      console.log(user);
      AuthService.signIn(user, (err, res) => {
        if(err) console.log(err);
        _this.userId = $window.localStorage.id = res.data.id._id;
        _this.userName = $window.localStorage.name = res.data.id.name;
        _this.signedIn = true;
        _this.signedOut = false;
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
