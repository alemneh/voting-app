'use strict';

module.exports = function(app) {

  app.controller('NavController', ['AuthService', '$http',
  function(AuthService, $http) {
    let _this = this;
    _this.signedIn = true;


    var req = {
      method:'GET',
      url: 'http://localhost:3000/login',
      headers: {
        'authorization': 'hit'
      }
    }

    _this.signIn = function(user) {
      console.log(user);
      $http(req).then((res) => {
        console.log(res);
      }, (err) => console.log(err))
    }
  }])
}
