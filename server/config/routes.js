var auth = require('./auth'),
    users = require('../controller/users'),
    recipes = require('../controller/recipes'),
    food = require('../controller/food'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app){

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/recipes', recipes.getRecipes);
    app.post('/api/recipes', recipes.createRecipe);
    app.get('/api/recipes/:id', recipes.getRecipeById);
    app.put('/api/recipes/', recipes.updateRecipe);

    app.get('/api/food', food.getFood);
    app.get('/api/food/:id', food.getFoodById);



    app.get('/partials/main/:partialPath', function(req, res) {
        res.render('../../public/app/main/' + req.params.partialPath);
    });

    app.get('/partials/account/:partialPath', function(req, res) {
        res.render('../../public/app/account/' + req.params.partialPath);
    });

    app.get('/partials/recipe/:partialPath', function(req, res) {
        res.render('../../public/app/recipe/' + req.params.partialPath);
    });

    app.get('/partials/admin/:partialPath', function(req, res) {
        res.render('../../public/app/admin/' + req.params.partialPath);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function(req, res) {
        res.send(404);
    })

    app.get('*', function(req, res){
        res.render('index', {
            loggedUser: req.user
        });
    });
}