angular.module('app').factory('chCashedRecipes', function(chFood) {
    var food;

    return {
        query: function() {
            if(!food) {
                food = chFood.query();
            }

            return food;
        }

    }
})