angular.module('app.service.data', [])



.service('dataService', [function()
{
   return {
      execute: function(url)
      {
         return 'json/' + url.replace('get/', '') + '.json';
      }
   };
}]);