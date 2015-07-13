describe('app.model.contact', function()
{
   describe('contactModel', function()
   {
      var contactModel = null;

      beforeEach(module('app.model.contact'));

      beforeEach(inject(function(_contactModel_)
      {
         contactModel = _contactModel_;
      }));


      describe('.newModel()', function()
      {
         it('should be defined as a function', function()
         {
            expect(angular.isFunction(contactModel.newModel)).toBe(true);
         });


         it('should return a new object', function()
         {
            expect(contactModel.newModel()).toBeTruthy();
         });


         describe('should set', function()
         {
            var model;

            beforeEach(function()
            {
               model = contactModel.newModel();
            });


            it('model.isSuccessDisplayed to false', function()
            {
               expect(model.isSuccessDisplayed).toBe(false);
            });

            
            it('model.errorList to []', function()
            {
               expect(model.errorList).toEqual([]);
            });


            it('model.firstName to null', function()
            {
               expect(model.firstName).toBe(null);
            });


            it('model.lastName to null', function()
            {
               expect(model.lastName).toBe(null);
            });


            it('model.email to null', function()
            {
               expect(model.email).toBe(null);
            });


            it('model.comment to null', function()
            {
               expect(model.comment).toBe(null);
            });


            it('model.addressList to []', function()
            {
               expect(model.addressList).toEqual([]);
            });
         });


         describe('model.getAddressList()', function()
         {
            var $scope, model, deferred, addressApi, response;

            beforeEach(inject(function($rootScope, $q, _addressApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               addressApi = _addressApi_;
               model = contactModel.newModel();
               spyOn(addressApi, 'get').and.returnValue(deferred.promise);
               response = [{id:1}, {id:2}];
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.getAddressList)).toBe(true);
            });


            it('should call addressApi.get and pass it the right parameters', function()
            {
               var expected = {count:3};
               model.getAddressList();
               expect(addressApi.get.calls.count()).toBe(1);
               expect(addressApi.get).toHaveBeenCalledWith(expected);
            });


            it('should set model.addressList to response if the promise is resolved', function()
            {
               model.addressList = null;
               model.getAddressList();
               deferred.resolve(response);
               $scope.$digest();
               expect(model.addressList).toBe(response);
            });


            it('should not affect model.addressList if the promise is rejected', function()
            {
               var original = 'Original';
               model.addressList = original;
               model.getAddressList();
               deferred.reject();
               $scope.$digest();
               expect(model.addressList).toBe(original);
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.getAddressList().then(function()
               {
                  isPromise = true;
               });

               deferred.resolve(response);
               $scope.$digest();
               expect(isPromise).toBe(true);
            });
         });


         describe('model.send()', function()
         {
            var $scope, model, deferred, contactApi;

            beforeEach(inject(function($rootScope, $q, _contactApi_)
            {
               $scope = $rootScope.$new();
               deferred = $q.defer();
               contactApi = _contactApi_;
               model = contactModel.newModel();
               spyOn(contactApi, 'post').and.returnValue(deferred.promise);
            }));


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.send)).toBe(true);
            });


            it('should call contactApi.post and pass it the right parameters', function()
            {
               model.firstName = 'Chris';
               model.lastName = 'Carrington';
               model.email = 'chris@gmail.com';
               model.comment = 'Nice app dude';
               model.send();
               expect(contactApi.post.calls.count()).toBe(1);
               expect(contactApi.post).toHaveBeenCalledWith({
                  firstName: model.firstName,
                  lastName: model.lastName,
                  email: model.email,
                  comment: model.comment
               });
            });


            it('should return a promise', function()
            {
               var isPromise = null;

               model.send().then(function()
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
               model = contactModel.newModel();
               model.firstName = 'Chris';
               model.lastName = 'Carrington';
               model.email = 'chris@gmail.com';
               model.comment = 'Nice app dude';
            });


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.validate)).toBe(true);
            });


            it('should return a proper result if firstName is falsy', function()
            {
               model.firstName = null;
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(false);
               expect(_.includes(validationResult.errors, 'First name required')).toBe(true);
            });


            it('should return a proper result if firstName is truthy', function()
            {
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(true);
               expect(_.includes(validationResult.errors, 'First name required')).toBe(false);
            });


            it('should return a proper result if lastName is falsy', function()
            {
               model.lastName = null;
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(false);
               expect(_.includes(validationResult.errors, 'Last name required')).toBe(true);
            });


            it('should return a proper result if lastName is truthy', function()
            {
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(true);
               expect(_.includes(validationResult.errors, 'Last name required')).toBe(false);
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
               expect(_.includes(validationResult.errors, 'Valid email required')).toBe(false);
            });


            it('should return a proper result if comment is falsy', function()
            {
               model.comment = null;
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(false);
               expect(_.includes(validationResult.errors, 'Comment required')).toBe(true);
            });


            it('should return a proper result if comment is truthy', function()
            {
               var validationResult = model.validate();
               expect(validationResult.isValid).toBe(true);
               expect(_.includes(validationResult.errors, 'Comment required')).toBe(false);
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