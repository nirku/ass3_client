angular.module('POIapp')
.controller('modalContentCtrl',['$location','$scope','$http','$rootScope',function($location,$scope,$http,$rootScope) {
    let serverUrl='http://localhost:3000/'
    self=this;
    $scope.review = true;
    $scope.enabled = {};
    $scope.flag = {};//if poi has reviews
}]);

