angular.module('app.dir.crHeader', [])



.directive('crHeader', [function()
{
   return {
      scope: false,
      restrict: 'E',
      templateUrl: 'directives/cr-header/crHeader.html'
   };
}]);