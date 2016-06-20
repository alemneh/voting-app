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

app.controller('MainController', ['httpService', 'AuthService', '$location', '$window',
 function(httpService, AuthService, $location, $window) {

   const _this = this;
   const pollResource = httpService('/users/', '/polls');

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
       });
     }

   }


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
       console.log(res);
       $location.path('/mypolls');
     });
   };

 }]);
