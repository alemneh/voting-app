'use strict';


module.exports = function(app) {
  app.controller('HomeController', ['httpService', 'AuthService', '$window', '$location',
  function(httpService, AuthService, $window, $location) {
    let _this = this;
    let pollResource = httpService('polls');
    _this.polls = ['polls'];

    _this.getPolls = function() {
      pollResource.getAll().then((res) => {
        _this.polls = res.data.data;
      }, function(error) {
        console.log(error);
        console.log('In here.');
      })
    }

    _this.getPoll = function(poll) {
      $window.localStorage.poll = JSON.stringify(poll);
      $location.path('/pollview');
    }



  }])
}
