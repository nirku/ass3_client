angular.module('POIapp')
    .controller('favoritesController', ['$location', 'poiInfoService', '$window', '$scope', '$http', '$rootScope', 'favoritesService', function ($location, poiInfoService, $window, $scope, $http, $rootScope, favoritesService) {
        let serverUrl = 'http://localhost:3000/'
        self = this;
        $scope.sortBy;
        $scope.displayFavorites = [];

        $(".js-example-basic-single").select2({
            placeholder: "Choose in what way to sort",
            minimumResultsForSearch: Infinity,
            allowClear: true
        });

        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'usersPOI/getSavedPoints',
            params: { 'numOfPoints': 1000, "token": $window.localStorage.getItem('token') }
        })
            .then(function (response) {
                data = response.data
                $scope.favoritesPOI = [];
                $scope.favoritesPOI = data.POI;
                $scope.favoritesPOI.sort(function (a, b) { return b.sortingOrder - a.sortingOrder });
                $scope.displayFavorites = $scope.displayFavorites.concat($scope.favoritesPOI);
            }, function (response) {
                alert(response.data);
            })

        $scope.saveUserOrder = function () {
            newOrderArr = [];
            token = $window.localStorage.getItem('token');
            $scope.displayFavorites.forEach(poi => {
                newOrderArr.push({"pointID":poi.id, "sortingOrder":poi.sortingOrder});
            });
            $http.patch(serverUrl + 'usersPOI/saveFavoriteOrder',{"token": token, "order": newOrderArr},
             {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    alert("Order was saved successfuly")
                }, function (response) {
                    alert(response.data);
                })
        }

        $scope.open = function (poi) {
            console.log(poi)
            $scope.poi = {};
            $scope.poi.id = poi.id;
            $scope.poi.name = poi.name;
            $scope.poi.category = poi.category;
            poiInfoService.reterivePOI(poi.id).then(function (result) {
                poi_info = result.data;
                $scope.poi.description = poi_info.POI[0].description || "";
                $scope.poi.rating = poi_info.POI[0].rating;
                $scope.poi.views = poi_info.POI[0].views;
                $scope.poi.reviews = poi_info.reviews || "";
                $rootScope.poi = $scope.poi;
                favoritesService.checkFavoritesExists();
            });
        }

        $scope.changeSortingOrder = function () {
            $scope.displayFavorites.sort(function (a, b) { return b.sortingOrder - a.sortingOrder });
        }

        $scope.changeSort = function () {
            sortByArr = []
            sortByArr = sortByArr.concat($scope.favoritesPOI);
            if ($scope.sortBy === "Categories") {
                sortByArr.sort(function (a, b) {
                    var x = a.category.toLowerCase();
                    var y = b.category.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
            }
            if ($scope.sortBy === "Ranking") {
                $scope.recFuncToGetRanking(0, sortByArr);

            }
            if ($scope.sortBy === "") {
                sortByArr = $scope.favoritesPOI;
            }
            $scope.displayFavorites = sortByArr;
        }

        $scope.recFuncToGetRanking = function (i, sortByArr) {
            if (i >= $scope.favoritesPOI.length) {
                console.log(sortByArr);
                sortByArr.sort(function (a, b) { return b.ranking - a.ranking });
                return;
            }
            else {
                poiInfoService.reterivePOI($scope.favoritesPOI[i].id).then(function (result) {
                    poi_info = result.data;
                    sortByArr[i].ranking = poi_info.POI[0].rating;
                    i++;
                    return $scope.recFuncToGetRanking(i, sortByArr);
                });
            }
        }
    }])