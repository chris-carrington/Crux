describe('app.api.contact', function()
{
   var contactApi, $http, $scope, deferred;
   beforeEach(module('app.api.contact'));


   beforeEach(inject(function(_contactApi_, $rootScope, $q)
   {
      $scope = $rootScope.$new();
      deferred = $q.defer();
      contactApi = _contactApi_;
   }));


   describe('contactApi.post()', function()
   { 
      it('should return a promise', function()
      {
         var isPromise = null;

         contactApi.post().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});