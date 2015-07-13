angular.module('app.api.product', [])


.service('productApi', ['$http', function($http)
{
   return {
      get: function(params)
      {
         return $http.get('get/product', {params:params});
      }
   };
}]);