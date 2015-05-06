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
                description : ''
            });
            foodItem.create({
                title: 'Potato',
                description : ''
            });
        }
    });
}