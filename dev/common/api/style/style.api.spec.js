describe('app.api.style', function()
{
   var styleApi, $http, $scope, deferred;
   beforeEach(module('app.api.style'));


   beforeEach(inject(function(_styleApi_, _$http_, $rootScope, $q)
   {
      $http = _$http_;
      $scope = $rootScope.$new();
      deferred = $q.defer();
      styleApi = _styleApi_;
   }));


   describe('styleApi.get()', function()
   {
      beforeEach(function()
      {
         spyOn($http, 'get').and.returnValue(deferred.promise);
      });


      it('should be defined as a function', function()
      {
         expect(angular.isFunction(styleApi.get)).toBe(true);
      });


      it('should execute a "get" via the $http service and pass the correct parameters', function()
      {
         var params = {id:1};
         styleApi.get(params);
         expect($http.get.calls.count()).toBe(1);
         expect($http.get).toHaveBeenCalledWith('get/style', {params:params});
      });


      it('should return a promise', function()
      {
         var isPromise = null;

         styleApi.get().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});