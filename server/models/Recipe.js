var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    "title" : {type:String, required: '{PATH} is required!'},
    "ingredients" : [{
        __v: Number,
        _id: String,
        title : String,
        description : String
    }],
    "steps": [{
        actions: [{title: String, attr: String, time: Number}],
        items:
            [{
                __v: Number,
                _id: String,
                title: String,
                description: String
            }],
        text: String,
        num: Number
    }],
    "description" : {type: String},
    "time" : {type: Number},
    "rank": {type: Number},
    "created": {type: Date},
    "user": {type: String}
});

var Recipe = mongoose.model('Recipe', recipeSchema);


exports.createRecipes = function() {
    /*
    Recipe.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Recipe.create({
                title: 'Tomato Soup',
                ingredients : [],
                steps: [],
                description : 'Soup',
                time : '30',
                rank: '0',
                created: {},
                user : '0'
            });
            Recipe.create({
                title: 'Mashed Potato',
                ingredients : [],
                steps: [],
                description : '',
                time : '30',
                rank: '0',
                created: {},
                user : '0'
            });
            Recipe.create({
                title: 'Salmon Soup',
                ingredients : [],
                steps: [],
                description : 'Soup',
                time : '30',
                rank: '0',
                created: {},
                user : '0'
            });
        }
    });*/
}