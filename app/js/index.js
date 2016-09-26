'use strict';
require('angular');

const app = angular.module('PollCity', ['ngRoute']);
  // DIRECTIVES
require('./directives/nav-directive')(app);

  // SERVICES
require('./services/http-service')(app);
require('./services/auth-service')(app);

  // CONTROLLERS
require('./controllers/home-controller')(app);
require('./controllers/nav-controller')(app);
require('./controllers/poll-controller')(app);
require('./controllers/chart-controller')(app);
require('./controllers/my-polls-controller')(app);

 // ROUTES
require('./route-config')(app);

app.controller('MainController', ['httpService', 'AuthService', '$location', '$window',
 function(httpService, AuthService, $location, $window) {

   const _this = this;
   const pollResource = httpService('/users/', '/polls');


   _this.createUser = function(user) {
     AuthService.createUser(user, (err, res) => {
       if(!res) {
         console.log(err.data.error);
         _this.signupError = true;
       } else {
         $location.path('/');
       }

     });
   };

   _this.createPoll =function(poll) {
     var id = $window.localStorage.id;
     var options = poll.options.split('\n');
     var newPoll = new Poll(poll.name);
     options.forEach((ele) => {
       newPoll.addOp(ele);
     });
     pollResource.createPoll(newPoll, id).then((res) => {
       $location.path('/mypolls');
     });
   };

 }]);
