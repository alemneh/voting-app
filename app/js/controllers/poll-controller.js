'use strict';

module.exports = function(app) {
  app.controller('PollController', ['$window', '$location', '$http', '$route', 'httpService',
                  'ChartService',
  function($window, $location, $http, $route, httpService, ChartService) {
    let pollResource = httpService('/polls');

    let _this = this;
    _this.voted = true;
    _this.poll = JSON.parse($window.localStorage.poll);


    _this.updatePoll = function(poll) {
      if(poll == undefined) {
        $window.alert('pick a option');
      } else {
        this.poll.options.forEach((ele) => {
          if(ele.name == poll.option.name) return ele.count++;
        })
        pollResource.update(_this.poll, _this.poll._id)
          .then((res) => {
             $window.localStorage.voted = JSON.stringify(true);
             $route.reload();
          }, (err) => {
            $window.alert(err.data.message);

            console.log(err);

          });
      }
    }


  }]);
};
