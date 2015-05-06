var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    recipeModel = require('../models/Recipe'),
    foodModel = require('../models/Food');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('cookhub db opened');
    });

    userModel.createDefaultUsers();
    recipeModel.createRecipes();
    foodModel.createFood();

}
