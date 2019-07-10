angular.module('POIapp')
    .controller('forgotPwdController', ['$location', '$scope', '$http', '$rootScope', function ($location, $scope, $http, $rootScope) {
        let serverUrl = 'http://localhost:3000/'
        self = this;
        $scope.username;
        $scope.show = false;
        $scope.answers = [];


        $scope.getQuestions = function () {
            $http({
                method: 'GET',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'users/getUserQuestion',
                params: { 'username': $scope.username }
            })
                .then(function (response) {
                    data = response.data.questions
                    $scope.questions = [];
                    $scope.questions = data;
                    if ($scope.questions.length > 0)
                        $scope.show = true;
                    else {
                        alert("The given user does not exist in the system");
                        $scope.show = false;
                    }
                }, function (response) {
                    alert(response.data);
                    $scope.show = false;
                })
        }

        $scope.getPassword = function () {
            $http({
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                url: serverUrl + 'users/passwordRetrival',
                data: {"username": $scope.username, "answers": $scope.answers}
            })
                .then(function (response) {
                    console.log(response);
                    alert("Your password is " + response.data.password);
                }, function (response) {
                    alert(response.data);
                })
        }
    }]);