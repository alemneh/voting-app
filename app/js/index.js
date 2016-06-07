'use strict';
require('angular');

const app = angular.module('PollCity', ['ngRoute']);
  // DIRECTIVES
require('./nav-directive')(app);

  // SERVICES
require('./http-service')(app);
require('./auth-service')(app);

  // CONTROLLERS
require('./home-controller')(app);
require('./nav-controller')(app);
require('./poll-controller')(app);
require('./chart-controller')(app);
require('./my-polls')(app);

 // ROUTES
require('./route-config')(app);

app.controller('MainController', ['$http', '$location', '$window',
 function($http, $location, $window) {

  const _this = this;

  // Poll Constructor
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



  _this.createPoll =function(poll, id) {
    var options = poll.options.split('\n');
    var newPoll = new Poll(poll.name);
    options.forEach((ele) => {
      newPoll.addOp(ele);
    })
    console.log(newPoll);
    $http.post('http://localhost:3000/users/5753835b5aa378cf04a5ab9b/polls', newPoll)
      .then((res) => {
        $location.path('/mypolls');
        // _this.pollSaved = true;
      }, (err) => console.log(err))
  };

}])
