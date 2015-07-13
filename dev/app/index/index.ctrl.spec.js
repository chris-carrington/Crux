describe('app.ctrl.index', function()
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


      beforeEach(module('app.ctrl.index'));


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
         expect(args[0]).toBe('index');
         expect(args[1]).toEqual({
            url: '/index/',
            views: {
               '@': {
                  controller: 'IndexCtrl',
                  templateUrl: 'index/index.html'
               }
            }
         });
      });
   });


   describe('IndexCtrl', function()
   {
      var $scope, createController, model, indexModel;

      beforeEach(module('app.ctrl.index'));
      
      beforeEach(inject(function($controller, $rootScope, _indexModel_)
      {
         $scope = $rootScope.$new();
         indexModel = _indexModel_;
         model = indexModel.newModel();
         spyOn(indexModel, 'newModel').and.returnValue(model);

         createController = function(){return $controller('IndexCtrl', 
         {
            $scope: $scope,
            indexModel: indexModel
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
            spyOn(model, 'getStyle');
            spyOn(model, 'getBlogs');
            createController();
         });


         it('should call indexModel.newModel() and pass it no parameters', function()
         {
            expect(indexModel.newModel.calls.count()).toBe(1);
            expect(indexModel.newModel).toHaveBeenCalledWith();
         });


         it('should call model.getStyle() and pass it no parameters', function()
         {
            expect(model.getStyle.calls.count()).toBe(1);
            expect(model.getStyle).toHaveBeenCalledWith();
         });


         it('should call model.getBlogs() and pass it no parameters', function()
         {
            expect(model.getBlogs.calls.count()).toBe(1);
            expect(model.getBlogs).toHaveBeenCalledWith();
         });
      });
   });
});
