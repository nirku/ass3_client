angular.module('POIapp')
    .controller('loginController', ['$document', '$location', '$scope', '$http', '$uibModal', '$window', 'poiInfoService', '$rootScope', function ($document, $location, $scope, $http, $uibModal, $window, poiInfoService, $rootScope) {
        let serverUrl = 'http://localhost:3000/'
        self = this;
        let rank = 0;
        poiInfoService.reterivePOI(1);

        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'POI/getPopularPoints',
            params: { 'minimalRank': rank }
        })
            .then(function (response) {
                data = response.data
                $scope.randomPOI = [];
                getRandomPOI(data);
            }, function (response) {
                alert(response.data);
            })

        function getRandomPOI(POIArray) {
            var numberOfPOI = 3;
            for (var i = 0; i < numberOfPOI; i++) {
                var index = Math.floor(Math.random() * POIArray.POI.length);
                $scope.randomPOI[i] = POIArray.POI[index];
                POIArray.POI.splice(index, 1);
            }
        }

        $scope.open = function () {
            $rootScope.$broadcast('poi', 1);

        }


        $scope.submitLogin = function () {
            $http({
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'users/login',
                data: $scope.user
            })
                .then(function (response) {
                    //First function handles success
                    self.token = response.data.token;
                    $http.defaults.headers.common['Authorization'] = self.token;
                    $window.localStorage.setItem('token', self.token);
                    alert("You have logged in Successfully");
                    $http({
                        method: 'GET',
                        header: { 'Content-Type': 'application/json' },
                        url: serverUrl + "users/getUserInfo",
                        params: { "username": $scope.user.username }
                    })
                        .then(function (result) {
                            console.log(result.data);
                            $scope.user.loggedInUser = result.data.user.username;
                            $scope.user.username = result.data.user.username;
                            $scope.user.firstname = result.data.user.fname;
                            $scope.user.lastame = result.data.user.lname;
                            $scope.user.city = result.data.user.city;
                            $scope.user.country = result.data.user.country;
                            $scope.user.email = result.data.user.email;
                            console.log($scope.user);
                            $rootScope.login = true;
                            $rootScope.user = $scope.user;
                            $location.path('/home');
                        }, function (response) {
                            alert(response.data);
                        })
                }, function (response) {
                    //Second function handles error
                    alert(response.data);
                });
        }
    }])

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('POIapp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});