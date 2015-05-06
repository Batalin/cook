angular.module('app').factory('chCashedRecipes', function(chRecipe) {
    var recipes;

    return {
        query: function() {
            if(!recipes) {
                recipes = chRecipe.query();
            }

            return recipes;
        }

    }
})