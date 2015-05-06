angular.module('app').controller('chSignupCtrl', function($scope, chUser, chNotifier, $location, chAuth) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        chAuth.createUser(newUserData).then(function() {
            chNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            chNotifier.error(reason);
        });
    }
})