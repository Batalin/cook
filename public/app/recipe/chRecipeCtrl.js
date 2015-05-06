angular.module('app').controller('chRecipeCtrl', function($scope, chCashedRecipes, chIdentity, chNotifier, chRecipe, chUser, chFood) {
    $scope.recipes = chCashedRecipes.query();
    $scope.food = chFood.query();
    $scope.identity = chIdentity;
    $scope.takenRecipe = {};
    $scope.ingredients = {};


        $scope.changeItemClass = function(str, $event) {
        var length = $scope.food.length;
        var foodItem = {};
        for(var i=0;i<length;i++){
            if ($scope.food[i].title == str) foodItem = $scope.food[i];
        }
        var className = event.currentTarget.className;
        var cl = ($('#'+str));

        if(className.indexOf('item') > -1) {
            cl.addClass("pressed");
            cl.removeClass('item');
            $scope.ingredients[str] = foodItem;

        } else {
            cl.addClass("item");
            cl.removeClass('pressed');
            delete $scope.ingredients[str];
        }
    }


    $scope.sort = function() {
        //iteration through the all recipes compare every ingredient with the chosen products
        var search_size = Object.keys($scope.ingredients).length;
        var num_of_recipes = $scope.recipes.length;
        var difference, result;
        var compare;
        console.log($scope.recipes);
        for (recipe in $scope.recipes) {//check every recipe
            var recipe_size = recipe.ingredients.length;
            difference = 0; //initialize starting difference with the 0 value
            for (var j = 0; j < recipe_size; j++) {//check current recipe for difference with list of food

                compare = recipe.ingredients[j]; //product in recipe
                for (var key in $scope.ingredients) {
                    if (key == compare) {//current ingredient of recipe is present in fridge
                        difference++;
                    }
                }
                result = ((difference / recipe_size) * 100).toFixed(0);
                recipe.map_index = result;//assigning matching index to each recipe
            }
        }
    }

    $scope.take = function($event) {
        var user = chIdentity.currentUser;
        var id = event.currentTarget.id;
        var i = 0;
        if($.inArray(id, user.recipes) > -1)
            chNotifier.notify('You already have this recipe!');
        else {
            user.recipes.push(id);
            for(i=0; i < $scope.recipes.length;i++){
                if($scope.recipes[i]._id == user.recipes[user.recipes.length-1]) {
                    $scope.takenRecipe = $scope.recipes[i];
                    $scope.takenRecipe.rank += 1;
                }
            }
        }
        //console.log($scope.takenRecipe);


        var update = new chUser();
        console.log(update);
        update._id = user._id;
        update.username = user.username;
        update.firstName = user.firstName;
        update.lastName = user.lastName;
        update.recipes = ['asdf','adf'];
        console.log(update);
        //update.$update();

        /*
        chAuth.updateCurrentUser(newUserData).then(function() {
            chNotifier.notify('Your user account has been updated');
        }, function(reason) {
            chNotifier.error(reason);
        })*/
    }



    //$scope.sortOptions = [{value:"title", text:"Sort by title"}]f;
    //$scope.sortOrder = $scope.sortOptions[0].value;
});
