angular.module('app.api.tags', [])


.service('tagsApi', ['$http', function($http)
{
   return {
      get: function(params)
      {
         return $http.get('get/tags', {params:params});
      }
   };
}]);