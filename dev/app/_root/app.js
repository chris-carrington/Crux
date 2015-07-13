angular.module('app', [
   'app.config.base',
   'app.config.states',
   'app.config.directives'
])




.config(['$urlRouterProvider', function($urlRouterProvider)
{
   $urlRouterProvider.when('', '/index/');
   $urlRouterProvider.when('/', '/index/');
   $urlRouterProvider.otherwise('/index/');
}]);