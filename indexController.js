angular.module('POIapp')
.controller('indexController',['$location','$scope','$rootScope',function($location,$scope,$rootScope) {
    $rootScope.login = false;    
    $scope.deleteLocalStorage =function(){
        $rootScope.user.username = 'Guest';
        localStorage.clear();
        $location.path('/');
    }
    $scope.gotofavorites = function(){
        $location.path('/favorites');
    }
}])