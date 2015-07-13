describe('app.api.subscriber', function()
{
   var subscriberApi, $http, $scope, deferred;
   beforeEach(module('app.api.subscriber'));


   beforeEach(inject(function(_subscriberApi_, $rootScope, $q)
   {
      $scope = $rootScope.$new();
      deferred = $q.defer();
      subscriberApi = _subscriberApi_;
   }));


   describe('subscriberApi.post()', function()
   { 
      it('should return a promise', function()
      {
         var isPromise = null;

         subscriberApi.post().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});