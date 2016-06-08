'use strict';

module.exports = function(app) {

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: './views/home.html'
    }).when('/mypolls', {
      templateUrl: './views/my-polls.html'
    }).when('/newpoll', {
      templateUrl: './views/new-poll.html'
    }).when('/pollview', {
      templateUrl: './views/poll-view.html'
    }).when('/signup', {
      templateUrl: './views/signup.html'
    });
  }]);
};
