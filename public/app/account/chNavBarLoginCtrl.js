angular.module('app').controller('chNavBarLoginCtrl', function($scope, $http, chIdentity, chNotifier, chAuth, $location){
    $scope.identity = chIdentity;
    $scope.signin = function(username, password){
        chAuth.authenticateUser(username,password).then(function(success) {
            if(success) {
                chNotifier.notify('You have successfully logged in!');
            } else {
                chNotifier.notify('Username/password combination incorrect');
            }
        });
    }

    $scope.signout = function() {
        chAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            chNotifier.notify('You have signed out!');
            $location.path('/');
        })
    }

    $scope.o = function(){
        console.log(chIdentity);
        console.log($scope.identity.isAuthenticated());
    }
});