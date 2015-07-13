angular.module('app.model.contact', [
   'app.api.contact',
   'app.api.address'
])



.service('contactModel', ['addressApi', 'contactApi',

function(addressApi, contactApi)
{
   return {
      newModel: function(){
         return {
            isSuccessDisplayed: false,
            errorList: [],
            firstName: null,
            lastName: null,
            email: null,
            comment: null,
            addressList: [],
            getAddressList: function()
            {
               var self = this;
               var params = {count:3};

               return addressApi.get(params).then(function(response)
               {
                  self.addressList = response;
               });
            },
            send: function()
            {
               var self = this;
               var params = 
               {
                  firstName: self.firstName,
                  lastName: self.lastName,
                  email: self.email,
                  comment: self.comment
               };
               
               return contactApi.post(params);
            },
            validate: function()
            {
               var self = this;
               var validationResult = {isValid:true, errors:[]};

               if(!self.firstName)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('First name required');
               }
               if(!self.lastName)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('Last name required');
               }
               if(!self.email)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('Email required');
               }
               if(!self.comment)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('Comment required');
               }

               return validationResult;
            }
         };
      }
   };
}]);
