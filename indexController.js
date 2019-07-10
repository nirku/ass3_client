angular.module('POIapp')
.controller('indexController',['$location','$scope','$rootScope','$window','favoritesService',function($location,$scope,$rootScope,$window,favoritesService) {
    $rootScope.login = false;
    if($window.localStorage.getItem('token')){
        favoritesService.getFavoritesCounter();
    }

    loggedUser = localStorage.getItem("username");
    if(loggedUser){
        $rootScope.login = true;
        $rootScope.user = {}; 
        $rootScope.user.loggedInUser = loggedUser;
    }
    $scope.logout =function(){
        $rootScope.user.loggedInUser = 'Guest';
        $window.localStorage.clear();
        $location.path('/');
    }
}])