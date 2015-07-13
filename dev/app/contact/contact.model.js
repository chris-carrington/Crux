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
               
               return contactApi.post({
                  firstName: self.firstName,
                  lastName: self.lastName,
                  email: self.email,
                  comment: self.comment
               });
            },
            validate: function()
            {
               var self = this;
               var validationResult = {isValid:true, errors:[]};

               if(!self.firstName)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('First name is required');
               }
               if(!self.lastName)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('Last name is required');
               }
               if(!self.email)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('Email is required');
               }
               if(!self.comment)
               {
                  validationResult.isValid = false;
                  validationResult.errors.push('A comment is required');
               }

               return validationResult;
            }
         };
      }
   };
}]);
