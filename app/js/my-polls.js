'use strict';

module.exports = function(app) {
  app.controller('MyPollsController', ['$http', function($http) {
    let _this = this;

    _this.polls = ['polls'];
    -this.owner;

    _this.getAllPolls = function() {
      $http.get('http://localhost:3000/users/5753835b5aa378cf04a5ab9b/polls/')
        .then((res) => {
          _this.polls = res.data.data;
          _this.owner = res.data.data[0]._owner[0];
        }, (err) => console.log(err))
    };

    _this.removePoll = function(poll) {
      console.log(poll);
      $http.delete('http://localhost:3000/users/5753835b5aa378cf04a5ab9b/polls/' + poll._id)
        .then((res) => {
          console.log(res);
          _this.polls = _this.polls.filter((p) => p._id != poll._id);
          console.log(_this.polls);
        }, (err) => console.log(err))
    }

  }])
}
