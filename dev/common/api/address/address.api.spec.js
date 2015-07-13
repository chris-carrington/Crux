describe('app.api.address', function()
{
   var addressApi, $http, $scope, deferred;
   beforeEach(module('app.api.address'));


   beforeEach(inject(function(_addressApi_, _$http_, $rootScope, $q)
   {
      $http = _$http_;
      $scope = $rootScope.$new();
      deferred = $q.defer();
      addressApi = _addressApi_;
   }));


   describe('addressApi.get()', function()
   {
      beforeEach(function()
      {
         spyOn($http, 'get').and.returnValue(deferred.promise);
      });


      it('should be defined as a function', function()
      {
         expect(angular.isFunction(addressApi.get)).toBe(true);
      });


      it('should execute a "get" via the $http service and pass the correct parameters', function()
      {
         var params = {id:1};
         addressApi.get(params);
         expect($http.get.calls.count()).toBe(1);
         expect($http.get).toHaveBeenCalledWith('get/address', {params:params});
      });


      it('should return a promise', function()
      {
         var isPromise = null;

         addressApi.get().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});