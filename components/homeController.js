angular.module('poiApp')
.controller('loginController', ['Authservice','$location','$scope','$http','setHeadersToken','localStorageModel','$rootScope' ,function(Authservice,$location,$scope,$http,setHeadersToken,localStorageModel,$rootScope) {
    let serverUrl='http://localhost:3000/'
    self=this;
   
    $scope.sendPOI=function(id){
        $rootScope.$broadcast('poi',id);
    }
    $scope.submit_log=function(){
        $http.post(serverUrl + "Users/login", $scope.user)
        .then(function (response) {
            //First function handles success
            self.token = response.data.token;
            setHeadersToken.set(self.token)
            self.addTokenToLocalStorage();
            alert("You have logged in Successfully");
            $scope.user.startname=$scope.user.username;
            $http.post(serverUrl + "Users/log")
            .then(function(result){
                $scope.user.username=result.data.username;
                $scope.user.firstname=result.data.FirstName;
                $scope.user.lastame=result.data.LastName;
                $scope.user.city=result.data.City;
                $scope.user.country=result.data.Country;
                $scope.user.email=result.data.Email;
                $scope.user.categories=result.data.categories;
                $rootScope.login =true;
                $rootScope.user = $scope.user;
                $location.path('/home');
            },function(response){
                alert(response.data);
            })
        }, function (response) {
            //Second function handles error
            alert(response.data);
        });
  
    };
    self.addTokenToLocalStorage = function () {
        token = localStorageModel.getLocalStorage('token');
        if(token == undefined)
            localStorageModel.addLocalStorage('token', self.token);
        else
            localStorageModel.updateLocalStorage('token',self.token);
    }; 
    $scope.goToRegister= function () {
        
        $location.path('/register');
     };
}]);

