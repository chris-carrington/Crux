angular.module('app.ctrl.mens', [
   'ui.router',
   'app.model.mens'
])




.config(['$stateProvider', function($stateProvider)
{
   $stateProvider.state('mens', {
      url: '/mens/',
      views: {
         '@': {
            controller: 'MensCtrl',
            templateUrl: 'mens/mens.html'
         }
      }
   });
}])




.controller('MensCtrl', ['$scope', 'mensModel',

function($scope, mensModel)
{
   $scope.model = mensModel.newModel();
   $scope.model.getProducts();
   $scope.model.getTags();
   $scope.model.getCategories();
}]);