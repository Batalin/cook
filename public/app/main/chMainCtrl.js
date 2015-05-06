angular.module('app').controller('chMainCtrl', function($scope, chCashedRecipes) {
    $scope.recipes = chCashedRecipes.query();
});