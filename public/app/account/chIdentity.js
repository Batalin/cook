angular.module('app').factory('chIdentity', function($window, chUser){
    var currentUser;
    if(!!$window.loggedUser){
        currentUser = new chUser();
        angular.extend(currentUser, $window.loggedUser);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})