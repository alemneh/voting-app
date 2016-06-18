'use strict';

module.exports = function(app) {
  app.controller('PollController', ['$window', '$location', '$http', '$route',
  function($window, $location, $http, $route) {
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

    // _this.updatePoll = function(poll) {
    //   console.log(poll);
    //   if(poll === 'undefined') {
    //     console.log('pick a option');
    //   } else {
    //     this.poll.options.forEach((ele) => {
    //       if(ele.name == poll.option.name) return ele.count++;
    //     })
    //     $http.put('http://localhost:3000/users/5753835b5aa378cf04a5ab9b/polls/' + _this.poll._id, _this.poll)
    //       .then((res) => {
    //         $route.reload();
    //       }, (err) => console.log(err));
    //   }
    // }

  }]);
};
