'use strict';

module.exports = function(app) {
  app.controller('PollController', ['$window', '$location', '$http', '$route', 'httpService',
  function($window, $location, $http, $route, httpService) {
    let pollResource = httpService('/polls');
    function Poll(name) {
      this.name = name;
      this.options = [];
      this.addOp = addOp;
      this.addVote = addVote;

      function addOp(opt) {
        this.options.push({name:opt, count: 0});
      }

      function addVote(option) {
        this.options.forEach((ele) => {
          if(ele.name == option) {
            ele.count++;
            return;
          }
        })
      }

    }


    let _this = this;
    _this.poll = JSON.parse($window.localStorage.poll);


    _this.updatePoll = function(poll) {
      if(poll === 'undefined') {
        console.log('pick a option');
      } else {
        this.poll.options.forEach((ele) => {
          if(ele.name == poll.option.name) return ele.count++;
        })
        pollResource.update(_this.poll, _this.poll._id)
          .then((res) => {
            $route.reload();
          }, (err) => console.log(err));
      }
    }


  }]);
};
