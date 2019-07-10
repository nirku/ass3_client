angular.module('POIapp')
    .controller('poiBrowseController', ['$location', 'poiInfoService', '$window', '$scope', '$http', '$rootScope','favoritesService', function ($location, poiInfoService, $window, $scope, $http, $rootScope,favoritesService) {
        let serverUrl = 'http://localhost:3000/'
        self = this;
        $scope.inputSearch = "";

        $scope.filterByCat = function(category){
            var filteredArray = [];
            $scope.allpoi.forEach(poi => {
                if(poi.category === category)
                    filteredArray.push(poi)
            });
            console.log(filteredArray);
            $scope.pois = filteredArray;
        }

        $scope.filterBySearch = function(){
            var filteredArray = [];
            $scope.allpoi.forEach(poi => {
                if(poi.name.toLowerCase().includes($scope.inputSearch.toLowerCase()))
                    filteredArray.push(poi)
            });
            console.log(filteredArray);
            $scope.pois = filteredArray;
        }

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
                if($rootScope.login)
                    favoritesService.checkFavoritesExists();
            });
        }


        /**Get all the POI's to the POI browse page */
        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'POI/getAllPoints',
        })
            .then(function (response) {
                data = response.data
                $scope.allpoi = [];
                $scope.allpoi = data.POI;
                $scope.pois = $scope.allpoi;
            }, function (response) {
                alert(response.data);
            })

        /**Get all the categories to the POI browse page */
        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'users/getAllCategories',
        })
            .then(function (response) {
                data = response.data
                console.log(data)
                $scope.categories = data.categories;
            }, function (response) {
                alert(response.data);
            })

    }])