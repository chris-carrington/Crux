describe('app.model.index', function()
{
   describe('indexModel', function()
   {
      var indexModel = null;

      beforeEach(module('app.model.index'));

      beforeEach(inject(function(_indexModel_)
      {
         indexModel = _indexModel_;
      }));


      describe('.newModel()', function()
      {
         it('should be defined as a function', function()
         {
            expect(angular.isFunction(indexModel.newModel)).toBe(true);
         });


         it('should return a new object', function()
         {
            expect(indexModel.newModel()).toBeTruthy();
         });


         describe('should set', function()
         {
            var model;

            beforeEach(function()
            {
               model = indexModel.newModel();
            });

            
            it('model.race to []', function()
            {
               expect(model.blogList).toEqual([]);
            });


            it('model.styleList to []', function()
            {
               expect(model.styleList).toEqual([]);
            });
         });


         describe('model.getBlogs()', function()
         {
            var $scope, model, deferred, styleApi, response;

            beforeEach(inject(function($rootScope, $q, _styleApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               styleApi = _styleApi_;
               model = indexModel.newModel();
               spyOn(styleApi, 'get').and.returnValue(deferred.promise);
               response = [{id:1}, {id:2}];
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.getStyle)).toBe(true);
            });


            it('should call styleApi.get and pass it the right parameters', function()
            {
               var expected = {count:4};
               model.getStyle();
               expect(styleApi.get.calls.count()).toBe(1);
               expect(styleApi.get).toHaveBeenCalledWith(expected);
            });


            it('should set model.styleList to response if the promise is resolved', function()
            {
               model.styleList = null;
               model.getStyle();
               deferred.resolve(response);
               $scope.$digest();
               expect(model.styleList).toBe(response);
            });


            it('should not affect model.styleList if the promise is rejected', function()
            {
               var original = 'Original';
               model.styleList = original;
               model.getStyle();
               deferred.reject();
               $scope.$digest();
               expect(model.styleList).toBe(original);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.getStyle().then(function()
               {
                  isPromise = true;
               });

               deferred.resolve(response);
               $scope.$digest();
               expect(isPromise).toBe(true);
            });
         });


         describe('model.getBlogs()', function()
         {
            var $scope, model, deferred, blogsApi, response;

            beforeEach(inject(function($rootScope, $q, _blogsApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               blogsApi = _blogsApi_;
               model = indexModel.newModel();
               spyOn(blogsApi, 'get').and.returnValue(deferred.promise);
               response = [{id:1}, {id:2}];
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.getBlogs)).toBe(true);
            });


            it('should call blogsApi.get and pass it the right parameters', function()
            {
               var expected = {count:2};
               model.getBlogs();
               expect(blogsApi.get.calls.count()).toBe(1);
               expect(blogsApi.get).toHaveBeenCalledWith(expected);
            });


            it('should set model.blogList to response if the promise is resolved', function()
            {
               model.blogList = null;
               model.getBlogs();
               deferred.resolve(response);
               $scope.$digest();
               expect(model.blogList).toBe(response);
            });


            it('should not affect model.blogList if the promise is rejected', function()
            {
               var original = 'Original';
               model.blogList = original;
               model.getBlogs();
               deferred.reject();
               $scope.$digest();
               expect(model.blogList).toBe(original);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.getBlogs().then(function()
               {
                  isPromise = true;
               });

               deferred.resolve(response);
               $scope.$digest();
               expect(isPromise).toBe(true);
            });
         });
      });
   });
});