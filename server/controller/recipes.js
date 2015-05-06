var Recipe = require('mongoose').model('Recipe');

exports.getRecipes = function(req, res) {
    Recipe.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.createRecipe = function(req, res) {
    var recipeData = {};
    recipeData = req.body;
    console.log(req.body);
    console.log(Recipe.create(recipeData, function(err, user) {res.send(recipeData); }));
}

exports.getRecipeById = function(req, res) {
    Recipe.findOne({_id:req.params.id}).exec(function(err, recipe) {
        res.send(recipe);
    })
};

exports.updateRecipe = function(req, res) {

}