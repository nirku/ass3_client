angular.module('POIapp')
.controller('homeController', ['$location','$scope','$http','$rootScope' ,function($location,$scope,$http,$rootScope) {
    let serverUrl='http://localhost:3000/'
    self=this;
    
    console.log($rootScope.user)
}])