angular.module('app.model.crFooter', [
   'app.api.subscriber' 
])



.service('crFooterModel', ['subscriberApi', 

function(subscriberApi)
{
   return {
      newModel: function(){
         return {
            email: null,
            subscribe: function()
            {
               var self = this;
               var params = {email:self.email};

               return subscriberApi.post(params);
            },
            validate: function()
            {
               var self = this;
               var validationResult = {isValid:true, errors:[]};

               if(!self.email)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('Email required');
               }

               return validationResult;
            }
         };
      }
   };
}]);
