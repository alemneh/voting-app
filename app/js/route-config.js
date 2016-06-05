'use strict';

module.exports = function(app) {

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: './views/home.html'
    }).when('/mypoll', {
      templateUrl: './views/my-polls.html'
    })
  }]);
};
