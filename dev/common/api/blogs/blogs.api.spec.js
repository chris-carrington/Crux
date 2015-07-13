describe('app.api.blogs', function()
{
   var blogsApi, $http, $scope, deferred;
   beforeEach(module('app.api.blogs'));


   beforeEach(inject(function(_blogsApi_, _$http_, $rootScope, $q)
   {
      $http = _$http_;
      $scope = $rootScope.$new();
      deferred = $q.defer();
      blogsApi = _blogsApi_;
   }));


   describe('blogsApi.get()', function()
   {
      beforeEach(function()
      {
         spyOn($http, 'get').and.returnValue(deferred.promise);
      });


      it('should be defined as a function', function()
      {
         expect(angular.isFunction(blogsApi.get)).toBe(true);
      });


      it('should execute a "get" via the $http service and pass the correct parameters', function()
      {
         var params = {id:1};
         blogsApi.get(params);
         expect($http.get.calls.count()).toBe(1);
         expect($http.get).toHaveBeenCalledWith('get/blogs', {params:params});
      });


      it('should return a promise', function()
      {
         var isPromise = null;

         blogsApi.get().then(function()
         {
            isPromise = true;
         });

         deferred.resolve();
         $scope.$digest();
         expect(isPromise).toBe(true);
      });
   });
});