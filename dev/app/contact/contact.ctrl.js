angular.module('app.ctrl.contact', [
   'ui.router',
   'app.model.contact',
   'app.ctrl.prompt'
])




.config(['$stateProvider', function($stateProvider)
{
   $stateProvider.state('contact', {
      url: '/contact/',
      views: {
         '@': {
            controller: 'ContactCtrl',
            templateUrl: 'contact/contact.html'
         }
      }
   });
}])




.controller('ContactCtrl', ['$scope', 'contactModel', function($scope, contactModel)
{
   $scope.model = contactModel.newModel();
   $scope.model.getAddressList();
   

   $scope.send = function()
   {
      $scope.model.errorList.length = 0;
      $scope.model.isSuccessDisplayed = false;
      var validationResult = $scope.model.validate();      

      if(validationResult.isValid)
      {
         $scope.model.send()
            .then(function()
            {
               $scope.model.isSuccessDisplayed = true;
            })
            .catch(function(response)
            {
               $scope.model.errorList = response;
            });
      }
      else
      {
         $scope.model.errorList = validationResult.errors;
      }
   };
}]);