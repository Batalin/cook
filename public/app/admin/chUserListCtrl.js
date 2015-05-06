angular.module('app').controller('chUserListCtrl', function($scope, mvUser) {
  $scope.users = chUser.query();
});