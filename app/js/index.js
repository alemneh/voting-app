'use strict';
require('angular');

const app = angular.module('PollCity', ['ngRoute']);
  // DIRECTIVES
require('./directives/nav-directive')(app);

  // SERVICES
require('./services/http-service')(app);
require('./services/auth-service')(app);
require('./services/chart-service')(app);

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

   _this.validateLoginInput = function(username, password) {
    if(!username) {
      return 'Please enter username'
    } else if(!password) {
      return 'Pleas enter password'
    } else {
      return null;
    }
  }


   _this.createUser = function(user) {
     let username;
     let password;
     _this.signupError = false;
     console.log(_this.signupError);
     console.log(user);
     if(!user) {
       username = '';
       password = '';
     } else {
       username = user.username;
       password = user.password;
     }

     let validateLoginInput = _this.validateLoginInput(username, password);
     console.log(validateLoginInput);
     _this.signupError = false;

     if(validateLoginInput) {
      _this.error = validateLoginInput;
      _this.signupError = true;
      return;
    }

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
