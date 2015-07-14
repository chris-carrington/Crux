angular.module('app.dir.crFooter', [
   'app.model.crFooter',
   'app.ctrl.prompt'
])



.directive('crFooter', ['$modal', 'crFooterModel', 

function($modal, crFooterModel)
{
   return {
      scope: {},
      restrict: 'E',
      templateUrl: 'directives/cr-footer/crFooter.html',
      link: function($scope, element, attrs)
      {
         $scope.model = crFooterModel.newModel();

         var promptUser = function(params)
         {
            $modal.open(
            {
               controller: 'PromptCtrl',
               resolve: {params: function () { return params; }},
               templateUrl: 'modal/prompt/prompt.html',
            });
         };

         $scope.subscribe = function()
         {
            var validationResult = $scope.model.validate();

            if(validationResult.isValid)
            {
               $scope.model.subscribe()
                  .then(function()
                  {
                     $scope.model.email = null;

                     promptUser(
                     {
                        type: 'success',
                        title: 'Welcome To Crux', 
                        prompt: 'Your email address has been successfully recieved!'
                     });
                  })
                  .catch(function(response)
                  {
                     promptUser(
                     {
                        type: 'danger',
                        title: 'Error', 
                        prompt: response
                     });
                  });
            }
            else
            {
               promptUser(
               {
                  type: 'danger',
                  title: 'Error', 
                  prompt: validationResult.errors
               });
            }
         };
      }
   };
}]);