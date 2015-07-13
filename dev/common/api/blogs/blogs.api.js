angular.module('app.api.blogs', [])


.service('blogsApi', ['$http', function($http)
{
   return {
      get: function(params)
      {
         return $http.get('get/blogs', {params:params});
      }
   };
}]);