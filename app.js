var app = angular.module('POIapp', ["ngRoute",'angularCSS','LocalStorageModule']);
let serverUrl = 'http://localhost:3000/';

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'components/login.html',
        controller: 'loginController'

    })
    $routeProvider.when('/register', {
        templateUrl: 'components/register.html',
        controller: 'registerController',
        css: 'css/registerStyle.css'
    })
    $routeProvider.when('/about', {
        templateUrl: 'components/about.html',
    })
        .otherwise({ redirectTo: '/' });
}])