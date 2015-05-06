angular.module('app').factory('chFood', function($resource) {
    var FoodResource = $resource('/api/food/', {_id: "@id"} , {
        update: {method: 'PUT', isArray: false}
    });

    return FoodResource;
});