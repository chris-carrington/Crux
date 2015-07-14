describe('app.service.data', function()
{
   describe('dataService', function()
   {
      var dataService = null;

      beforeEach(module('app.service.data'));

      beforeEach(inject(function(_dataService_)
      {
         dataService = _dataService_;
      }));


      describe('.execute()', function()
      {
         it('should be defined as a function', function()
         {
            expect(angular.isFunction(dataService.execute)).toBe(true);
         });


         it('should properly format the url that is passed in', function()
         {
            var url = 'get/schools';
            var expected = 'json/schools.json';
            var result = dataService.execute(url);
            expect(result).toBe(expected);
         });
      });
   });
});