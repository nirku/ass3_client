angular.module('POIapp')
.controller('homeController', ['$location','poiInfoService', '$window','$scope','$http','$rootScope','favoritesService' ,function($location,poiInfoService,$window,$scope,$http,$rootScope,favoritesService) {
    let serverUrl='http://localhost:3000/'
    self=this;
    $rootScope.login = true;
    let numofpoints = 2;
    $http({
        method: 'GET',
        header: { 'Content-Type': 'application/json' },
        url: serverUrl + 'usersPOI/getPopularPoints',
        params: { 'numOfPoints': numofpoints,"token":$window.localStorage.getItem('token')}
    })
        .then(function (response) {
            data = response.data
            $scope.recommendedPOI = [];
            $scope.recommendedPOI = data.POI;
        }, function (response) {
            alert(response.data);
        })

        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'usersPOI/getSavedPoints',
            params: { 'numOfPoints': numofpoints,"token":$window.localStorage.getItem('token')}
        })
            .then(function (response) {
                data = response.data
                $scope.favPOI = [];
                $scope.favPOI = data.POI;
            }, function (response) {
                alert(response.data);
            })

            $scope.open = function (poi) {
                console.log(poi)
                $scope.poi = {};
                $scope.poi.id = poi.id;
                $scope.poi.name = poi.name;
                $scope.poi.category = poi.category;
                poiInfoService.reterivePOI(poi.id).then(function(result){
                    poi_info = result.data;
                    console.log(poi_info);
                    $scope.poi.description = poi_info.POI[0].description || "";
                    $scope.poi.rating = poi_info.POI[0].rating;
                    $scope.poi.views = poi_info.POI[0].views;
                    $scope.poi.reviews = poi_info.reviews || "";
                    $rootScope.poi = $scope.poi;
                    favoritesService.checkFavoritesExists();
                });
            }

}])