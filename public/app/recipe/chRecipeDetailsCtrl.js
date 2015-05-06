angular.module('app').controller('chRecipeDetailsCtrl', function($scope, chRecipe, $routeParams) {

    $scope.recipe = chRecipe.get({_id: $routeParams.id});

});
/*
angular.module('app').controller('chRecipeDetailsCtrl', function($scope, chRecipe, $routeParams) {
    var recipes = chRecipe.query();

    recipes.$promise.then(function(collection) {
        collection.forEach(function(recipe) {
            if(recipe._id === $routeParams.id) {
                $scope.recipe = recipe;
            }
        })
    })

    function cl(){
        console.log(recipes);
        console.log('some')
    }

});*/