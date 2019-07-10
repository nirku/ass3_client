angular.module('POIapp')
    .service('authService', ['$location','$window', '$http', '$route', '$rootScope','favoritesService', function ($location,$window, $http, $route, $rootScope, favoritesService) {
        self = this;
        self.checkAuth = function () {
            token = $window.localStorage.getItem('token');
            if (token) {
                return $http({
                    method: 'GET',
                    header: { 'Content-Type': 'application/json' },
                    url: serverUrl + 'usersPOI/validation',
                    params: { 'token': token }
                })
                    .then(function (result) {
                        $http({
                            method: 'GET',
                            header: { 'Content-Type': 'application/json' },
                            url: serverUrl + "users/getUserInfo",
                            params: { "username": result.data.username }
                        })
                            .then(function (result) {
                                console.log(result)
                                $rootScope.user = {};
                                $rootScope.user.loggedInUser = result.data.user.username;
                                $rootScope.user.username = result.data.user.username;
                                $rootScope.user.firstname = result.data.user.fname;
                                $rootScope.user.lastame = result.data.user.lname;
                                $rootScope.user.city = result.data.user.city;
                                $rootScope.user.country = result.data.user.country;
                                $rootScope.user.email = result.data.user.email;
                                $rootScope.login = true;
                                favoritesService.getFavoritesCounter();
                                $location.path('/home');
                                return;
                            })

                    }, function (err) {
                        $rootScope.login = false;
                        $location.path('/');
                    })
            }
            else {
                $rootScope.login = false;
                $location.path('/');
            }
        }
    }])

