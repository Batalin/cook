var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    "title" : {type:String, required: '{PATH} is required!'},
    "description" : {type: String}
})

var foodItem = mongoose.model('foodItem', foodSchema);

exports.createFood = function() {
    foodItem.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            foodItem.create({
                title: 'Tomato',
                description : '1'
            });
            foodItem.create({
                title: 'Potato',
                description : '2'
            });
            foodItem.create({
                title: 'Fish',
                description : '2'
            });
            foodItem.create({
                title: 'Beef',
                description : '2'
            });
            foodItem.create({
                title: 'Salt',
                description : '2'
            });
            foodItem.create({
                title: 'Sugar',
                description : '2'
            });
            foodItem.create({
                title: 'Onion',
                description : '2'
            });
            foodItem.create({
                title: 'Salad',
                description : '2'
            });
            foodItem.create({
                title: 'Carrot',
                description : '2'
            });
            foodItem.create({
                title: 'Garlic',
                description : '2'
            });
        }
    });
}