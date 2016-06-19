'use strict';

module.exports = function(app) {
  app.controller('MyPollsController', ['httpService', '$window', '$location',
    function(httpService, $window, $location) {
      let _this = this;
      const pollResource = httpService('/users/', '/polls');

      _this.polls = ['polls'];
      _this.owner = $window.localStorage.name;
      _this.zeroPolls = false;
      var id;

      _this.getPoll = function(poll) {
        $window.localStorage.poll = JSON.stringify(poll);
        $location.path('/pollview');
      }

      _this.getAllPolls = function() {
        id = $window.localStorage.id;
        pollResource.getAllMyPolls(id)
          .then((res) => {
            if(!res.data.data.length) {
              console.log('You have no polls');
              _this.zeroPolls = true;
            } else {
              _this.polls = res.data.data;
            }

          }, (err) => console.log(err))
      };

      _this.removePoll = function(poll) {
        console.log(poll);
        pollResource.removePoll(id, poll._id)
          .then((res) => {
            console.log(res);
            _this.polls = _this.polls.filter((p) => p._id != poll._id);
            console.log(_this.polls);
          }, (err) => console.log(err))
      }

    }])
}
