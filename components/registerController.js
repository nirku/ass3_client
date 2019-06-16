angular.module('POIapp')
    .controller('registerController', ['$location', '$scope', '$http', '$rootScope', function ($location, $scope, $http, $rootScope) {
        let serverUrl = 'http://localhost:3000/'
        self = this;
        $scope.userData = {};
        $scope.userData.questions = [];
        $scope.userData.answers = [];
        /**Submit form function */
        $scope.submitForm = function (){
            if(validateForm()){
                console.log($scope.userData);
                $http({
                    method: 'POST',
                    header: { 'Content-Type': 'application/json' },
                    url: serverUrl + 'users/addUser',
                    data: $scope.userData
                })
                .then(function (response) {
                    $location.path('/');
                    alert("User added succesfully");
                    
                }, function (response) {
                    alert("Error adding user");
                })
            }
        }

        /**Get all the countries to the user registertion box */
        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'users/getAllCountries',
        })
            .then(function (response) {
                data = response.data
                $scope.countries = data.Countries.Country;
            }, function (response) {
                alert(response.data);
            })

        /**Get all the questions to the user registertion box */
        $http({
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            url: serverUrl + 'users/getAllQuestions',
        })
            .then(function (response) {
                data = response.data
                $scope.questions = data.questions;
            }, function (response) {
                alert(response.data);
            })

        /**Get all the categories to the user registertion box */
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

        /*[ Select 2 Config ]
                ===========================================================*/
        try {
            var selectSimple = $('.js-select-simple');
            selectSimple.each(function () {
                var that = $(this);
                var selectBox = that.find('select');
                var selectDropdown = that.find('.select-dropdown');
                console.log(selectBox);
                selectBox.select2({
                    placeholder: selectBox[0].name.charAt(0).toUpperCase() + selectBox[0].name.slice(1),
                    dropdownParent: selectDropdown
                });
            });
        } catch (err) {
            console.log(err);
        }

        $(".js-example-basic-multiple").select2({
            placeholder: "Categories",
            width: 'resolve',
            allowClear:true
        });
    }])

    function validateForm(){
        var minimum = 2;
        if($(".js-example-basic-multiple").select2('data').length>=minimum){
            return true;
        }else {
             alert('Please shoose at least '+minimum+' categories')
            return false;
        }
    }
