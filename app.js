var app = angular.module('POIapp', ["ngRoute","angularCSS"]);
let serverUrl = 'http://localhost:3000/';

app.config(['$locationProvider','$httpProvider','$routeProvider', function ($locationProvider,$httpProvider,$routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'components/login.html',
        controller : 'loginController',
        resolve:{
            Auth:function(authService){
                return authService.checkAuth();
            }
        }
    })
    $routeProvider.when('/register', {
        templateUrl: 'components/register.html',
        controller: 'registerController',
        css: 'css/registerStyle.css'
    })
    $routeProvider.when('/home',{
        templateUrl: 'components/home.html',
        controller: 'homeController'
    })
    $routeProvider.when('/forgot',{
        templateUrl: 'components/forgotPwd.html',
        controller: 'forgotPwdController'
    })
    $routeProvider.when('/poi',{
        templateUrl: 'components/poiBrowse.html',
        controller: 'poiBrowseController',
        css: 'css/poiBrowseStyle.css'

    })
    $routeProvider.when('/favorites',{
        templateUrl: 'components/favorites.html',
        controller: 'favoritesController'
    })
    $routeProvider.when('/about', {
        templateUrl: 'components/about.html',
    })
        .otherwise({ redirectTo: '/' });
}])

app.service('poiInfoService', function($http) {
  this.reterivePOI = function (poiID) {
    return $http({
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      url: serverUrl + 'POI/getInfoPoint',
      params: {"pointID":poiID}
    })
}
});