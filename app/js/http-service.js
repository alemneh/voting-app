module.exports = function(app) {
  var mainRoute;
  app.factory('httpService', ['$http', 'AuthService', function($http, AuthService) {
    mainRoute = process.env.PORT;
    console.log(process.env.PORT);


    function Resource(resourceName, subResource) {
      console.log(resourceName);
      console.log(subResource);
      this.resourceName = resourceName;
      this.subResource = subResource;
    }

    Resource.prototype.getAll = function() {
      return $http.get(this.resourceName);
    };

    Resource.prototype.getAllMyPolls = function(id) {
      return $http.get(this.resourceName + id + this.subResource, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };



    Resource.prototype.getOne = function(id) {
      return $http.get(this.resourceName + (id ? '/' + id : ''), {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.getOneSubResource = function(id, subResource) {
      return $http.get(this.resourceName + '/' + id + '/' + subResource, {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    Resource.prototype.create = function(data) {
      return $http.post(this.resourceName, data);
    };

    Resource.prototype.createPoll = function(data, id) {
      return $http.post(this.resourceName + id + this.subResource, data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };
    console.log();
    Resource.prototype.update = function(data, id) {
      console.log(data);
      return $http.put(this.resourceName + (id ? '/' + id : ''), data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    Resource.prototype.remove = function(id) {
      return $http.delete(this.resourceName + (id ? '/' + id : ''), {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    Resource.prototype.removePoll = function(id, pollId) {
      return $http.delete(this.resourceName + id + this.subResource + '/'+ pollId, {
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
