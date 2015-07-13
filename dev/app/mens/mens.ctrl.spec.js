describe('app.ctrl.mens', function()
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


      beforeEach(module('app.ctrl.mens'));


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
         expect(args[0]).toBe('mens');
         expect(args[1]).toEqual({
            url: '/mens/',
            views: {
               '@': {
                  controller: 'MensCtrl',
                  templateUrl: 'mens/mens.html'
               }
            }
         });
      });
   });


   describe('MensCtrl', function()
   {
      var $scope, createController, model, mensModel;

      beforeEach(module('app.ctrl.mens'));
      
      beforeEach(inject(function($controller, $rootScope, _mensModel_)
      {
         $scope = $rootScope.$new();
         mensModel = _mensModel_;
         model = mensModel.newModel();
         spyOn(mensModel, 'newModel').and.returnValue(model);

         createController = function(){return $controller('MensCtrl', 
         {
            $scope: $scope,
            mensModel: mensModel
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
            spyOn(model, 'getTags');
            spyOn(model, 'getProducts');
            spyOn(model, 'getCategories');
            createController();
         });


         it('should call mensModel.newModel() and pass it no parameters', function()
         {
            expect(mensModel.newModel.calls.count()).toBe(1);
            expect(mensModel.newModel).toHaveBeenCalledWith();
         });


         it('should call model.getTags() and pass it no parameters', function()
         {
            expect(model.getTags.calls.count()).toBe(1);
            expect(model.getTags).toHaveBeenCalledWith();
         });


         it('should call model.getProducts() and pass it no parameters', function()
         {
            expect(model.getProducts.calls.count()).toBe(1);
            expect(model.getProducts).toHaveBeenCalledWith();
         });


         it('should call model.getCategories() and pass it no parameters', function()
         {
            expect(model.getCategories.calls.count()).toBe(1);
            expect(model.getCategories).toHaveBeenCalledWith();
         });
      });
   });
});
