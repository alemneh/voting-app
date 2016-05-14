'use strict';
require('angular');

const app = angular.module('PollCity', []);

app.controller('MainController', ['$http', function($http) {

  const _this = this;
  _this.greetings = 'Hello!';

}])
