describe('app.ctrl.prompt', function()
{
   describe('PromptCtrl', function()
   {
      var $scope, params, createController, model, promptModel;

      beforeEach(module('app.ctrl.prompt'));
      
      beforeEach(inject(function($controller, $rootScope, _promptModel_)
      {
         $scope = $rootScope.$new();
         promptModel = _promptModel_;
         model = promptModel.newModel();
         spyOn(promptModel, 'newModel').and.returnValue(model);
         params = {id:1};

         createController = function(){return $controller('PromptCtrl', 
         {
            $scope: $scope,
            promptModel: promptModel,
            params: params
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
            spyOn(model, 'execute');
            createController();
         });


         it('should call promptModel.newModel() and pass it no parameters', function()
         {
            expect(promptModel.newModel.calls.count()).toBe(1);
            expect(promptModel.newModel).toHaveBeenCalledWith();
         });


         it('should call model.execute() and pass it the right parameters', function()
         {
            expect(model.execute.calls.count()).toBe(1);
            expect(model.execute).toHaveBeenCalledWith(params);
         });
      });
   });
});
