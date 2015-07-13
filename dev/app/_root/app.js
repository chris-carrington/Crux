angular.module('app', [
   'app.config.base',
   'app.config.directives',
   'app.config.controllers'
])




.config(['$urlRouterProvider', function($urlRouterProvider)
{
   $urlRouterProvider.when('', '/index/');
   $urlRouterProvider.when('/', '/index/');
   $urlRouterProvider.otherwise('/index/');
}]);