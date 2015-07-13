describe('app.model.mens', function()
{
   describe('mensModel', function()
   {
      var mensModel = null;

      beforeEach(module('app.model.mens'));

      beforeEach(inject(function(_mensModel_)
      {
         mensModel = _mensModel_;
      }));


      describe('.newModel()', function()
      {
         it('should be defined as a function', function()
         {
            expect(angular.isFunction(mensModel.newModel)).toBe(true);
         });


         it('should return a new object', function()
         {
            expect(mensModel.newModel()).toBeTruthy();
         });


         describe('should set', function()
         {
            var model;

            beforeEach(function()
            {
               model = mensModel.newModel();
            });

            
            it('model.tagList to []', function()
            {
               expect(model.tagList).toEqual([]);
            });


            it('model.categoryList to []', function()
            {
               expect(model.categoryList).toEqual([]);
            });
         });


         describe('model.getProducts()', function()
         {
            var $scope, model, deferred, productApi, response;

            beforeEach(inject(function($rootScope, $q, _productApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               productApi = _productApi_;
               model = mensModel.newModel();
               spyOn(productApi, 'get').and.returnValue(deferred.promise);
               response = [{id:1}, {id:2}];
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.getProducts)).toBe(true);
            });


            it('should call productApi.get and pass it the right parameters', function()
            {
               var expected = {type:'mens'};
               model.getProducts();
               expect(productApi.get.calls.count()).toBe(1);
               expect(productApi.get).toHaveBeenCalledWith(expected);
            });


            it('should set model.productList to response if the promise is resolved', function()
            {
               model.productList = null;
               model.getProducts();
               deferred.resolve(response);
               $scope.$digest();
               expect(model.productList).toBe(response);
            });


            it('should not affect model.productList if the promise is rejected', function()
            {
               var original = 'Original';
               model.productList = original;
               model.getProducts();
               deferred.reject();
               $scope.$digest();
               expect(model.productList).toBe(original);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.getProducts().then(function()
               {
                  isPromise = true;
               });

               deferred.resolve(response);
               $scope.$digest();
               expect(isPromise).toBe(true);
            });
         });


         describe('model.getTags()', function()
         {
            var $scope, model, deferred, tagsApi, response;

            beforeEach(inject(function($rootScope, $q, _tagsApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               tagsApi = _tagsApi_;
               model = mensModel.newModel();
               spyOn(tagsApi, 'get').and.returnValue(deferred.promise);
               response = [{id:1}, {id:2}];
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.getTags)).toBe(true);
            });


            it('should call tagsApi.get and pass it the right parameters', function()
            {
               var expected = {count:10, type:'mens'};
               model.getTags();
               expect(tagsApi.get.calls.count()).toBe(1);
               expect(tagsApi.get).toHaveBeenCalledWith(expected);
            });


            it('should set model.tagList to response if the promise is resolved', function()
            {
               model.tagList = null;
               model.getTags();
               deferred.resolve(response);
               $scope.$digest();
               expect(model.tagList).toBe(response);
            });


            it('should not affect model.tagList if the promise is rejected', function()
            {
               var original = 'Original';
               model.tagList = original;
               model.getTags();
               deferred.reject();
               $scope.$digest();
               expect(model.tagList).toBe(original);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.getTags().then(function()
               {
                  isPromise = true;
               });

               deferred.resolve(response);
               $scope.$digest();
               expect(isPromise).toBe(true);
            });
         });


         describe('model.getCategories()', function()
         {
            var $scope, model, deferred, categoryApi, response;

            beforeEach(inject(function($rootScope, $q, _categoryApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               categoryApi = _categoryApi_;
               model = mensModel.newModel();
               spyOn(categoryApi, 'get').and.returnValue(deferred.promise);
               response = [{id:1}, {id:2}];
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.getCategories)).toBe(true);
            });


            it('should call categoryApi.get and pass it the right parameters', function()
            {
               var expected = {count:10, type:'mens'};
               model.getCategories();
               expect(categoryApi.get.calls.count()).toBe(1);
               expect(categoryApi.get).toHaveBeenCalledWith(expected);
            });


            it('should set model.categoryList to response if the promise is resolved', function()
            {
               model.categoryList = null;
               model.getCategories();
               deferred.resolve(response);
               $scope.$digest();
               expect(model.categoryList).toBe(response);
            });


            it('should not affect model.categoryList if the promise is rejected', function()
            {
               var original = 'Original';
               model.categoryList = original;
               model.getCategories();
               deferred.reject();
               $scope.$digest();
               expect(model.categoryList).toBe(original);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.getCategories().then(function()
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