describe('app.model.crFooter', function()
{
   describe('crFooterModel', function()
   {
      var crFooterModel = null;

      beforeEach(module('app.model.crFooter'));

      beforeEach(inject(function(_crFooterModel_)
      {
         crFooterModel = _crFooterModel_;
      }));


      describe('.newModel()', function()
      {
         it('should be defined as a function', function()
         {
            expect(angular.isFunction(crFooterModel.newModel)).toBe(true);
         });


         it('should return a new object', function()
         {
            expect(crFooterModel.newModel()).toBeTruthy();
         });


         describe('should set', function()
         {
            var model;

            beforeEach(function()
            {
               model = crFooterModel.newModel();
            });


            it('model.email to null', function()
            {
               expect(model.email).toBe(null);
            });
         });


         describe('model.subscribe()', function()
         {
            var $scope, model, deferred, subscriberApi;

            beforeEach(inject(function($rootScope, $q, _subscriberApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               subscriberApi = _subscriberApi_;
               model = crFooterModel.newModel();
               spyOn(subscriberApi, 'post').and.returnValue(deferred.promise);
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.subscribe)).toBe(true);
            });


            it('should call subscriberApi.post and pass it the right parameters', function()
            {
               model.email = 'chris@gmail.com';
               var expected = {email:model.email};
               model.subscribe();
               expect(subscriberApi.post.calls.count()).toBe(1);
               expect(subscriberApi.post).toHaveBeenCalledWith(expected);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.subscribe().then(function()
               {
                  isPromise = true;
               });

               deferred.resolve();
               $scope.$digest();
               expect(isPromise).toBe(true);
            });
         });


         describe('model.validate()', function()
         {
            var model;

            beforeEach(function()
            {
               model = crFooterModel.newModel();
               model.email = 'chris@gmail.com';
            });


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.validate)).toBe(true);
            });


            it('should return a proper result if email is falsy', function()
            {
               model.email = null;
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(false);
               expect(_.includes(validationResult.errors, 'Email required')).toBe(true);
            });


            it('should return a proper result if email is truthy', function()
            {
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(true);
               expect(_.includes(validationResult.errors, 'Email required')).toBe(false);
            });


            it('should return a proper result if all values are valid', function()
            {
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(true);
               expect(validationResult.errors).toEqual([]);
            });
         });
      });
   });
});