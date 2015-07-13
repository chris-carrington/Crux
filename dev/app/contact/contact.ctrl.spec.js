describe('app.ctrl.contact', function()
{
   describe('config', function()
   {
      var stateProvider;
      var totalStatesConfigured;
      var totalStatesConfiguredInModule = 1;


      beforeEach(module('ui.router'));


      beforeEach(module(function($stateProvider) 
      {
         stateProvider = $stateProvider;    
         spyOn(stateProvider, 'state').and.returnValue(stateProvider);
      }));


      beforeEach(module('app.ctrl.contact'));


      beforeEach(inject(function()
      {
         totalStatesConfigured = stateProvider.state.calls.count();
      }));


      it('should be configured the correct number of times', inject(function()
      {
         expect(stateProvider.state.calls.count()).toBeGreaterThan(totalStatesConfiguredInModule - 1);
      }));
       

      it('should configure the state',function()
      {
         var args = stateProvider.state.calls.argsFor(totalStatesConfigured - totalStatesConfiguredInModule);          
         expect(args.length).toBe(2);
         expect(args[0]).toBe('contact');
         expect(args[1]).toEqual({
            url: '/contact/',
            views: {
               '@': {
                  controller: 'ContactCtrl',
                  templateUrl: 'contact/contact.html'
               }
            }
         });
      });
   });


   describe('ContactCtrl', function()
   {
      var $scope, createController, model, contactModel;

      beforeEach(module('app.ctrl.contact'));
      
      beforeEach(inject(function($controller, $rootScope, _contactModel_)
      {
         $scope = $rootScope.$new();
         contactModel = _contactModel_;
         model = contactModel.newModel();
         spyOn(contactModel, 'newModel').and.returnValue(model);
         spyOn(model, 'getAddressList');

         createController = function(){return $controller('ContactCtrl', 
         {
            $scope: $scope,
            contactModel: contactModel
         });};
      }));


      it('should be able to be instantiated', function()
      {
         expect(createController()).toBeTruthy();
      });


      describe('$scope.model', function()
      {
         beforeEach(function()
         {
            createController();
         });


         it('should call contactModel.newModel() and pass it no parameters', function()
         {
            expect(contactModel.newModel.calls.count()).toBe(1);
            expect(contactModel.newModel).toHaveBeenCalledWith();
         });


         it('should call model.getAddressList() and pass it no parameters', function()
         {
            expect(model.getAddressList.calls.count()).toBe(1);
            expect(model.getAddressList).toHaveBeenCalledWith();
         });
      });


      describe('#scope.send()', function()
      {
         var deferred;

         beforeEach(inject(function($q)
         {
            deferred = $q.defer();
            createController();
            spyOn(model, 'send').and.returnValue(deferred.promise);
         }));


         it('should be defined as a function', function()
         {
            expect(angular.isFunction($scope.send)).toBe(true);
         });


         it('should call model.validate() and pass it no parameters', function()
         {
            spyOn(model, 'validate').and.returnValue({isValid:false});
            $scope.send();
            expect(model.validate.calls.count()).toBe(1);
            expect(model.validate).toHaveBeenCalledWith();
         });


         it('should set model.isSuccessDisplayed to false', function()
         {
            spyOn(model, 'validate').and.returnValue({isValid:false});
            model.isSuccessDisplayed = true;
            $scope.send();
            expect(model.isSuccessDisplayed).toBe(false);
         });


         it('should reset model.errorList', function()
         {
            spyOn(model, 'validate').and.returnValue({isValid:true});
            model.errorList = ['1', '2'];
            $scope.send();
            expect(model.errorList).toEqual([]);
         });


         it('should call model.send() and pass it no parameters if validations are true', function()
         {
            spyOn(model, 'validate').and.returnValue({isValid:true});
            $scope.send();
            expect(model.send.calls.count()).toBe(1);
            expect(model.send).toHaveBeenCalledWith();
         });


         it('should populate errors if the promise via model.send() is rejected', function()
         {
            var response = ['Uh oh'];
            spyOn(model, 'validate').and.returnValue({isValid:true});
            $scope.send();
            deferred.reject(response);
            $scope.model.errorList = [];
            $scope.$digest();
            expect(model.errorList).toBe(response);
         });


         it('should not populate errors if the promise via model.send() is resolved', function()
         {
            var original = ['Good'];
            spyOn(model, 'validate').and.returnValue({isValid:true});
            $scope.send();
            deferred.resolve();
            $scope.model.errorList = original;
            $scope.$digest();
            expect(model.errorList).toBe(original);
         });


         it('should set model.isSuccessDisplayed to true if the send promise is resolved', function()
         {
            spyOn(model, 'validate').and.returnValue({isValid:true});
            $scope.send();
            deferred.resolve();
            $scope.model.isSuccessDisplayed = null;
            $scope.$digest();
            expect(model.isSuccessDisplayed).toBe(true);
         });


         it('should not affect model.isSuccessDisplayed if the send promise is rejected', function()
         {
            var original = 'original';
            spyOn(model, 'validate').and.returnValue({isValid:true});
            $scope.send();
            deferred.reject({});
            $scope.model.isSuccessDisplayed = original;
            $scope.$digest();
            expect(model.isSuccessDisplayed).toBe(original);
         });


         it('should populate errors if validations are false', function()
         {
            var errors = ['Uh oh'];
            spyOn(model, 'validate').and.returnValue({isValid:false, errors:errors});
            $scope.model.errorList = [];
            $scope.send();            
            expect(model.errorList).toBe(errors);
         });


         it('should not populate errors if validations are true', function()
         {
            var original = ['Good'];
            spyOn(model, 'validate').and.returnValue({isValid:true});
            $scope.model.errorList = original;
            $scope.send();            
            expect(model.errorList).toBe(original);
         });
      });
   });
});
