module.exports = function(app) {

  app.factory('httpService', ['$http', 'AuthService', function($http, AuthService) {
    var mainRoute = process.env.URL || 'http://localhost:3000';


    function Resource(resourceName, subResource) {

      this.resourceName = resourceName;
      this.subResource = subResource;
    }

    Resource.prototype.getAll = function() {
      return $http.get(mainRoute + this.resourceName);
    };

    Resource.prototype.getAllMyPolls = function(id) {
      return $http.get(mainRoute + this.resourceName + id + this.subResource, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };



    Resource.prototype.getOne = function(id) {
      return $http.get(mainRoute + this.resourceName + (id ? '/' + id : ''), {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.getOneSubResource = function(id, subResource) {
      return $http.get(mainRoute + this.resourceName + '/' + id + '/' + subResource, {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };

    Resource.prototype.createPoll = function(data, id) {
      return $http.post(mainRoute + this.resourceName + id + this.subResource, data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.update = function(data, id) {
      return $http.put(mainRoute + this.resourceName + (id ? '/' + id : ''), data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.remove = function(id) {
      return $http.delete(mainRoute + this.resourceName + (id ? '/' + id : ''), {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    Resource.prototype.removePoll = function(id, pollId) {
      return $http.delete(mainRoute + this.resourceName + id + this.subResource + '/'+ pollId, {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    return function(resourceName, subResource) {
      return new Resource(resourceName, subResource);
    };

  }]);
}
