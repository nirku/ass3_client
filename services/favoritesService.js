angular.module('POIapp')
    .service('favoritesService', ['$location', '$window', '$http', '$route', '$rootScope', function ($location, $window, $http, $route, $rootScope) {
        self = this;
        self.checkFavoritesExists = function () {
            $http({
                method: 'GET',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'usersPOI/getSavedPoints',
                params: { 'numOfPoints': 1000, "token": $window.localStorage.getItem('token') }
            })
                .then(function (response) {
                    data = response.data
                    favPOI = [];
                    favPOI = data.POI;
                    console.log(favPOI);
                    console.log($rootScope.poi)
                    $rootScope.existsInFav = favPOI.find(poi => poi.id === $rootScope.poi.id);
                }, function (response) {
                    alert(response.data);
                })
        }

        self.getFavoritesCounter = function () {
            $http({
                method: 'GET',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'usersPOI/getSavedPoints',
                params: { 'numOfPoints': 1000, "token": $window.localStorage.getItem('token') }
            })
                .then(function (response) {
                    data = response.data
                    favPOI = [];
                    favPOI = data.POI;
                    $rootScope.favCounter = favPOI.length
                }, function (response) {
                    alert(response.data);
                })
        }
    }])