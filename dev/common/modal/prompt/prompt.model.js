angular.module('app.model.prompt', [])



.service('promptModel', [function()
{
   return {
      newModel: function(){
         return {
            isArray: false,
            title: null,
            prompt: null,
            type: null,
            execute: function(params)
            {
               var self = this;

               self.title = params.title;
               self.type = params.type;
               self.prompt = params.prompt;
               self.isArray = angular.isArray(params.prompt);
            }
         };
      }
   };
}]);
