angular.module('app.model.index', [
   'app.api.blogs', 
   'app.api.style', 
])




.service('indexModel', ['blogsApi', 'styleApi',

function(blogsApi, styleApi)
{
   return {
      newModel: function(){
         return {
            blogList: [],
            styleList: [],
            getStyle: function()
            {
               var self = this;
               var params = {count:4};

               styleApi.get(params).then(function(response)
               {
                  self.styleList = response;
               });
            },
            getBlogs: function()
            {
               var self = this;
               var params = {count:2};

               blogsApi.get(params).then(function(response)
               {
                  self.blogList = response;
               });
            }
         };
      }
   };
}]);
