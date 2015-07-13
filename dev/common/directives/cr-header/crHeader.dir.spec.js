describe('app.dir.crHeader', function() 
{
   describe('crHeader', function()
   {
      beforeEach(module('app.dir.crHeader'));

      describe('definition', function() 
      {
         var directives;

         beforeEach(inject(function(_crHeaderDirective_) 
         {
            directives = _crHeaderDirective_;
         }));


         it('should have exactly one directive', function() 
         {
            expect(directives).toBeDefined();
            expect(directives.length).toBe(1);
         });


         it('should not define an isolate scope', function()
         {
            expect(directives[0].scope).toBe(false);
         });


         it('should be restricted to element only', function() 
         {
            expect(directives[0].restrict).toBe('E');
         });


         it('should set a template', function() 
         {
            expect(directives[0].templateUrl).toBe('directives/cr-header/crHeader.html');
         });
      });
   });
});