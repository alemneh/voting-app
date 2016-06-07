'use strict';

module.exports = function(app) {

  app.controller('NavController', ['AuthService', '$http',
  function(AuthService, $http) {
    let _this = this;
    _this.signedIn = false;


    var req = {
      method:'GET',
      url: 'http://localhost:3000/login',
      headers: {
        'authorization': 'hit'
      }
    }

    _this.signIn = function(user) {
      console.log(user);
      AuthService.signIn(user, (err, res) => {
        if(err) console.log(err);
        _this.signedIn = true;
      })
    }
  }])
}
