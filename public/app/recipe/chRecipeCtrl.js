angular.module('app').controller('chRecipeCtrl', function($scope, chRecipe) {
   $scope.recipes = chRecipe.query();
});