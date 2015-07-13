angular.module('app.model.mens', [
   'app.api.tags', 
   'app.api.product', 
   'app.api.category'
])




.service('mensModel', ['tagsApi', 'productApi', 'categoryApi',

function(tagsApi, productApi, categoryApi)
{
   return {
      newModel: function(){
         return {
            tagList: [],
            categoryList: [],
            productList: [],
            getProducts: function()
            {
               var self = this;
               var params = {type:'mens'};

               return productApi.get(params).then(function(response)
               {
                  self.productList = response;
               });
            },
            getTags: function()
            {
               var self = this;
               var params = {count:10, type:'mens'};

               return tagsApi.get(params).then(function(response)
               {
                  self.tagList = response;
               });
            },
            getCategories: function()
            {
               var self = this;
               var params = {count:10, type:'mens'};

               return categoryApi.get(params).then(function(response)
               {
                  self.categoryList = response;
               });
            }
         };
      }
   };
}]);
