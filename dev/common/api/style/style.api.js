angular.module('app.api.style', [])


.service('styleApi', ['$http', function($http)
{
   return {
      get: function(params)
      {
         return $http.get('get/style', {params:params});
      }
   };
}]);