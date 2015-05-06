angular.module('app').controller('chProfileCtrl', function($scope, chAuth, chIdentity, chNotifier) {
    $scope.email = chIdentity.currentUser.username;
    $scope.fname = chIdentity.currentUser.firstName;
    $scope.lname = chIdentity.currentUser.lastName;

    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        chAuth.updateCurrentUser(newUserData).then(function() {
            chNotifier.notify('Your user account has been updated');
        }, function(reason) {
            chNotifier.error(reason);
        })
    }
})