angular.module('app.dir.crHeader', [])



.directive('crHeader', [function()
{
   return {
      scope: false,
      restrict: 'E',
      templateUrl: 'directives/cr-header/crHeader.html',
      link: function($scope, element, attrs)
      {
         var $navbar = $(element[0]);

         $navbar.find('.nav a').on('click', function()
         {
            $navbar.find('.collapse.navbar-collapse').collapse('hide');
         });
      }
   };
}]);