describe('app.api.category', function()
{
   var categoryApi, $http, $scope, deferred;
   beforeEach(module('app.api.category'));


   beforeEach(inject(function(_categoryApi_, _$http_, $rootScope, $q)
   {
      $http = _$http_;
      $scope = $rootScope.$new();
      deferred = $q.defer();
      categoryApi = _categoryApi_;
   }));


   describe('categoryApi.get()', function()
   {
      beforeEach(function()
      {
         spyOn($http, 'get').and.returnValue(deferred.promise);
      });


      it('should be defined as a function', function()
      {
         expect(angular.isFunction(categoryApi.get)).toBe(true);
      });


      it('should execute a "get" via the $http service and pass the correct parameters', function()
      {
         var params = {id:1};
         categoryApi.get(params);
         expect($http.get.calls.count()).toBe(1);
         expect($http.get).toHaveBeenCalledWith('get/category', {params:params});
      });


      it('should return a promise', function()
      {
         var isPromise = null;

         categoryApi.get().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});