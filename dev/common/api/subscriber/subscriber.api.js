angular.module('app.api.subscriber', [])


.service('subscriberApi', ['$q', function($q)
{
   return {
      // Return a resolved promise since we can not
      // actually post data without a backend
      post: function(params)
      {
         var deferred = $q.defer();
         var promise = deferred.promise;
         deferred.resolve();

         return promise;
      }
   };
}]);