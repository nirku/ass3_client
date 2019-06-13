angular.module('POIapp')
.controller('loginController', ['$location','$scope','$http','$rootScope' ,function($location,$scope,$http,$rootScope) {
    let serverUrl='http://localhost:3000/'
    self=this;
    let rank = 0;

    $http({method: 'GET',
        header:{'Content-Type': 'application/json'},
        url: serverUrl+'POI/getPopularPoints',
        params: {'minimalRank': rank}
    })
        .then(function(response){
        data = response.data
        $scope.randomPOI = [];
        console.log(data);
        getRandomPOI(data);
    },function(response){
        alert(response.data);
    })

    function getRandomPOI(POIArray){
        var numberOfPOI = 3;
        for(var i=0;i<numberOfPOI;i++){
            var index = Math.floor(Math.random()*POIArray.POI.length);
            $scope.randomPOI[i] = POIArray.POI[index];
            POIArray.POI.splice(index, 1);
        }
    }  
}]);