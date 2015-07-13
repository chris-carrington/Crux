describe('app.api.tags', function()
{
   var tagsApi, $http, $scope, deferred;
   beforeEach(module('app.api.tags'));


   beforeEach(inject(function(_tagsApi_, _$http_, $rootScope, $q)
   {
      $http = _$http_;
      $scope = $rootScope.$new();
      deferred = $q.defer();
      tagsApi = _tagsApi_;
   }));


   describe('tagsApi.get()', function()
   {
      beforeEach(function()
      {
         spyOn($http, 'get').and.returnValue(deferred.promise);
      });


      it('should be defined as a function', function()
      {
         expect(angular.isFunction(tagsApi.get)).toBe(true);
      });


      it('should execute a "get" via the $http service and pass the correct parameters', function()
      {
         var params = {id:1};
         tagsApi.get(params);
         expect($http.get.calls.count()).toBe(1);
         expect($http.get).toHaveBeenCalledWith('get/tags', {params:params});
      });


      it('should return a promise', function()
      {
         var isPromise = null;

         tagsApi.get().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});