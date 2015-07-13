angular.module('app.ctrl.index', [
   'ui.router',
   'app.model.index'
])




.config(['$stateProvider', function($stateProvider)
{
   $stateProvider.state('index', {
      url: '/index/',
      views: {
         '@': {
            controller: 'IndexCtrl',
            templateUrl: 'index/index.html'
         }
      }
   });
}])




.controller('IndexCtrl', ['$scope', 'indexModel',

function($scope, indexModel)
{
   $scope.model = indexModel.newModel();
   $scope.model.getStyle();
   $scope.model.getBlogs();
}]);