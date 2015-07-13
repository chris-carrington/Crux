angular.module('app.service.httpProvider', [
   'app.service.data'
])



.service('origin', [function()
{
   return {
      isApi: function(url)
      {
         var isApi = true;

         url = url.toLowerCase();

         if(url.match(/\.html|template|alert|modal|accordian|tabs|popover/))
         {
            isApi = false;
         }

         return isApi;
      }
   };
}])


.service('requestInterceptor', ['dataService', 'origin', function(dataService, origin)
{
   return {
      request: function(promise)
      {
         if(origin.isApi(promise.url))
         {
            promise.url = dataService.execute(promise.url);
         }
         
         return promise;
      }
   };
}])


.service('responseInterceptor', ['origin', function(origin)
{
   return {
      response: function(promise)
      {
         if(origin.isApi(promise.config.url))
         {
            return promise.data;
         }

         return promise;
      }
   };
}])


.service('responseErrorInterceptor', ['$q', 'origin', 

function($q, $injector, origin)
{
   return {
      responseError: function(promise)
      {
         if(origin.isApi(promise.config.url))
         {
            return $q.reject(promise.data);
         }         

         return $q.reject(promise);
      }
   };
}])


.config(['$httpProvider', function($httpProvider)
{
   $httpProvider.interceptors.push('requestInterceptor');
   $httpProvider.interceptors.push('responseInterceptor');
   $httpProvider.interceptors.push('responseErrorInterceptor');
}]);