describe('app.model.prompt', function()
{
   describe('promptModel', function()
   {
      var promptModel = null;

      beforeEach(module('app.model.prompt'));

      beforeEach(inject(function(_promptModel_)
      {
         promptModel = _promptModel_;
      }));


      describe('.newModel()', function()
      {
         it('should be defined as a function', function()
         {
            expect(angular.isFunction(promptModel.newModel)).toBe(true);
         });


         it('should return a new object', function()
         {
            expect(promptModel.newModel()).toBeTruthy();
         });


         describe('should set', function()
         {
            var model;

            beforeEach(function()
            {
               model = promptModel.newModel();
            });

            
            it('model.isArray to false', function()
            {
               expect(model.isArray).toBe(false);
            });


            it('model.title to null', function()
            {
               expect(model.title).toBe(null);
            });


            it('model.prompt to null', function()
            {
               expect(model.prompt).toBe(null);
            });


            it('model.type to null', function()
            {
               expect(model.type).toBe(null);
            });
         });


         describe('model.execute()', function()
         {
            var model, params;

            beforeEach(function()
            {
               model = promptModel.newModel();
               params = {
                  id: 1,
                  type: 'danger',
                  prompt: ['1', '2']
               };
            });


            it('should be defined as a function', function()
            {
               expect(angular.isFunction(model.execute)).toBe(true);
            });


            it('should set model.title to prams.title', function()
            {
               model.title = null;
               model.execute(params);
               expect(model.title).toBe(params.title);
            });


            it('should set model.type to prams.type', function()
            {
               model.type = null;
               model.execute(params);
               expect(model.type).toBe(params.type);
            });


            it('should set model.prompt to prams.type', function()
            {
               model.prompt = null;
               model.execute(params);
               expect(model.prompt).toBe(params.prompt);
            });


            it('should correctly set model.isArray based on params', function()
            {
               model.isArray = null;
               model.execute(params);
               expect(model.isArray).toBe(true);
               params.prompt = 'Not array';
               model.execute(params);
               expect(model.isArray).toBe(false);
            });
         });
      });
   });
});