angular.module('POIapp')
    .controller('modalContentCtrl', ['$location', '$window', '$scope', '$http', '$rootScope','favoritesService', function ($location, $window, $scope, $http, $rootScope,favoritesService) {
        let serverUrl = 'http://localhost:3000/'
        self = this;
        $scope.reviewWindow = true;
        $scope.enabled = {};
        $scope.flag = {};//if poi has reviews
        $scope.review = {};

        $scope.openReview = function () {
            $scope.reviewWindow = false;
        }
        $scope.clearReview = function () {
            $scope.reviewWindow = true;
        }


        $scope.addToFavorites = function () {
            token = $window.localStorage.getItem('token');
            pointID = $rootScope.poi.id;
            $http({
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'usersPOI/addSavedPoint',
                data: { "token": token, "pointID": pointID }
            })
                .then(function (response) {
                    alert("POI was saved in favorites");
                    favoritesService.checkFavoritesExists();
                    favoritesService.getFavoritesCounter();
                }, function (response) {
                    alert(response.data);
                })
        }

        $scope.removeFromFavorites = function () {
            token = $window.localStorage.getItem('token');
            pointID = $rootScope.poi.id;
            $http.delete(serverUrl + 'usersPOI/removeSavedPoint', {data: {"token": token, "pointID": pointID}, 
            headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    alert("POI was removed from favorites");
                    favoritesService.checkFavoritesExists();
                    favoritesService.getFavoritesCounter();
                }, function (response) {
                    alert(response.data);
                })
        }


        $scope.submitReview = function () {
            token = $window.localStorage.getItem('token');
            $scope.review.pointID = $rootScope.poi.id;
            $scope.review.token = token;
            $http({
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'usersPOI/rankPoint',
                data: $scope.review
            })
                .then(function (response) {
                    alert("Review was added successfully, Thank you!");
                }, function (response) {
                    alert(response.data);
                })
        }
    }]);

