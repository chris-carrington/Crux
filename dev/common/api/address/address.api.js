angular.module('app.api.address', [])


.service('addressApi', ['$http', function($http)
{
   return {
      get: function(params)
      {
         return $http.get('get/address', {params:params});
      }
   };
}]);