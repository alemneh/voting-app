'use strict';


module.exports = function(app) {
  app.controller('HomeController', ['httpService', 'AuthService',
  function(httpService, AuthService) {
    let _this = this;
    let pollResource = httpService('polls');
    _this.polls = ['polls'];

    _this.getPolls = function() {
      pollResource.getAll().then((res) => {
        console.log(res);
        _this.polls = res.data.data;
      }, function(error) {
        console.log(error);
      })
    }



  }])
}
