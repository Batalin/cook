angular.module('app').controller('chUserListCtrl', function($scope, chUser) {
  $scope.users = chUser.query();
});