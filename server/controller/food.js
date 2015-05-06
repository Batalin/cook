var Food = require('mongoose').model('foodItem');

exports.getFood = function(req, res) {
    Food.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getFoodById = function(req, res) {
    Food.findOne({_id:req.params.id}).exec(function(err, food) {
        res.send(food);
    })
};