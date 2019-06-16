var app = angular.module('POIapp', ["ngRoute","angularCSS","ngSanitize","ui.bootstrap","ngAnimate"]);
let serverUrl = 'http://localhost:3000/';

app.config(['$locationProvider','$httpProvider','$routeProvider', function ($locationProvider,$httpProvider,$routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'components/login.html',
        controller: 'loginController'

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
    $routeProvider.when('/about', {
        templateUrl: 'components/about.html',
    })
        .otherwise({ redirectTo: '/' });
}])

app.service('poiInfoService', function($http) {
  this.reterivePOI = function (poiID) {
    $http({
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      url: serverUrl + 'POI/getInfoPoint',
      params: {"pointID":poiID}
    })
    .then(function(response){
      data = response.data;
      console.log(data);
    })  
  }
});