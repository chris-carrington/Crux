angular.module('app.api.category', [])


.service('categoryApi', ['$http', function($http)
{
   return {
      get: function(params)
      {
         return $http.get('get/category', {params:params});
      }
   };
}]);