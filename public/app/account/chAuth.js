angular.module('app').factory('chAuth', function($http, chIdentity, $q, chUser) {
       return {
       authenticateUser: function(username, password) {
           var df = $q.defer();
           $http.post('/login', {username:username, password:password}).then(function(response){
               if(response.data.success) {
                   var user  = new chUser();
                   angular.extend(user, response.data.user);
                   chIdentity.currentUser = user;
                   df.resolve(true);
               } else {
                   df.resolve(false);
               }
           });
       return df.promise;
       },

       createUser: function(newUserData) {
           var newUser = new chUser(newUserData);
           var df = $q.defer();
           newUser.$save().then(function() {
               chIdentity.currentUser = newUser;
               df.resolve();
           }, function(response){
               df.reject(response.data.reason);
           });

           return df.promise;
       },

       updateCurrentUser: function(newUserData) {
           var df = $q.defer();
           var clone = angular.copy(chIdentity.currentUser);
           console.log('in Auth');
           console.log(clone);
           console.log(newUserData);
           angular.extend(clone, newUserData);
           clone.$update().then(function() {
               chIdentity.currentUser = clone;
               df.resolve();
           }, function(response) {
               df.reject(response.data.reason);
           });
           return df.promise;
       },

       logoutUser: function() {
            var df = $q.defer();
           $http.post('/logout', {logout:true}).then(function() {
               chIdentity.currentUser = undefined;
               df.resolve();
           });
           return df.promise;
       },
       authorizeCurrentUserForRoute: function(role) {
           if(chIdentity.isAuthorized(role)) {
               return true;
           } else {
               return $q.reject('not authorized');
           }

       },
       authorizeAuthenticatedUserForRoute: function() {
           if(chIdentity.isAuthenticated()) {
               return true;
           } else {
               return $q.reject('not authorized');
           }
       }

   }

    function merge(obj1,obj2){ // Our merge function
        var result = {}; // return result
        for(var i in obj1){      // for every property in obj1
            if((i in obj2) && (typeof obj1[i] === "object") && (i !== null)){
                result[i] = merge(obj1[i],obj2[i]); // if it's an object, merge
            }else{
                result[i] = obj1[i]; // add it to result
            }
        }
        for(i in obj2){ // add the remaining properties from object 2
            if(i in result){ //conflict
                continue;
            }
            result[i] = obj2[i];
        }
        return result;
    }
});