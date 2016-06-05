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

 // ROUTES
require('./route-config')(app);

app.controller('MainController', ['$http', function($http) {

  const _this = this;
  _this.greetings = 'Hello!';

}])
