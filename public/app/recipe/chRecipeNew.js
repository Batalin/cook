angular.module('app').controller('chRecipeNew', function($scope, chFood, chNotifier, chIdentity, chRecipe) {

    $scope.food = chFood.query();
    $scope.stepNum;
    $scope.ingredients = {};
    $scope.steps = [];
    $scope.actions = {};
    $scope.actions['cut'] = {title: 'cut', attr: '', time: ''};
    $scope.actions['boil'] = {title: 'boil', attr: '', time: ''};
    $scope.actions['fry'] = {title: 'fry', attr: '', time: ''};
    $scope.actions['bake'] = {title: 'bake', attr: '', time: ''};
    $scope.actions['shake'] = {title: 'shake', attr: '', time: ''};
    $scope.stepActions = {};
    $scope.stepItems = {};
    $scope.stepString = '';
    $scope.time;
    $scope.newItem = [];

    //var i = new chFood({title:"onion", description:"descriptiion"});
   //$scope.ingredients[i.title] = i;

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

    $scope.chooseIngredient = function(title, $event) {
        var length = $scope.ingredients.length;
        var foodItem = {};
        for(item in $scope.ingredients){
            var obj = $scope.ingredients[item];
            //console.log(obj);
            //console.log(obj.title)
            if (obj.title == title) {
                foodItem = obj;
            }
        }

        var className = event.currentTarget.className;
        var cl = ($('#step'+title));

        if(className.indexOf('item') > -1) {
            cl.addClass("pressed");
            cl.removeClass('item');
            $scope.stepItems[title] = foodItem;

        } else {
            cl.addClass("item");
            cl.removeClass('pressed');
            delete $scope.stepItems[title];
        }
    };


    $scope.chooseAction = function(title, $event) {

        var actionItem = $scope.actions[title];
        var className = event.currentTarget.className;
        var cl = ($('#'+title));

        if(className.indexOf('item') > -1) {
            cl.addClass("pressed");
            cl.removeClass('item');
            $scope.stepActions[title] = actionItem;

        } else {
            cl.addClass("item");
            cl.removeClass('pressed');
            delete $scope.stepActions[title];
        }
    };


    $scope.nextStep = function(){
        var obj = {};
        var itemText = '';
        var actionsTitle = '';
        obj.actions = [];
        obj.items = [];
        for(item in $scope.stepActions){
            obj.actions.push($scope.stepActions[item]);
        }
        for(item in $scope.stepItems){
            obj.items.push($scope.stepItems[item]);
        }
        obj.num = $scope.steps.length;

        for(item in obj.items) {
            itemText += obj.items[item].title + ', ';
        }
        for(item in $scope.stepActions){
            actionsTitle += item;
            console.log(item);
        }
        obj.text = (obj.num+1) + '. Take ' + itemText + ' and ' + actionsTitle;
        $scope.steps.push(obj);/*
        obj.title = actionsTitle;
        $scope.newItem.push(obj);*/

        //reset the action and step items for the next step
        var element;
        for(item in $scope.actions){
            element = ($('#'+item));
            element.removeClass("pressed");
            element.addClass("item");

        }
        for(item in $scope.stepItems){
            element = ($('#step'+item));
            element.removeClass("pressed");
            element.addClass("item");
        }
        $scope.stepActions = {};
    }


    $scope.save = function() {
        var recipe = {};
        recipe.ingredients = [];
        recipe.steps = $scope.steps;
        var i =0;

        for(item in $scope.ingredients){
            recipe.ingredients.push($scope.ingredients[item]);
        }
        recipe.title = $scope.recipeTitle;
        recipe.description = $scope.recipeDescription;
        recipe.time = 30;
        recipe.rank = 0;
        recipe.created = new Date();
        recipe.user = '';
        var newRecipe = new chRecipe(recipe);
        newRecipe.$save();

       // chNotifier.notify('Your recipe has been added');
    }

    $scope.removeStep = function() {
        console.log($scope.steps);
        var index = $scope.steps.length;
        console.log(index);
        $scope.steps.splice((index-1), 1);
        console.log($scope.steps);
    }

});
