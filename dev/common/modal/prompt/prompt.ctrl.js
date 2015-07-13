angular.module('app.ctrl.prompt', [
   'app.model.prompt'
])




.controller('PromptCtrl', ['$scope', 'promptModel', 'params',

function($scope, promptModel, params)
{
   $scope.model = promptModel.newModel();
   $scope.model.execute(params);
}]);