var mongoose = require('mongoose'),
    crypt = require('../utilities/crypt');


    var userSchema = mongoose.Schema({
        firstName: {type:String, required:'{PATH} is required!'},
        lastName: {type:String, required:'{PATH} is required!'},
        username: {
            type: String,
            required: '{PATH} is required!',
            unique: true
        },
        salt: {type:String, required:'{PATH} is required!'},
        hashed_pwd: {type:String, required:'{PATH} is required!'},
        roles: [String],
        recipes: [String]
    });

    userSchema.methods = {
        authenticate: function(password) {
            return crypt.hashPwd(this.salt, password) === this.hashed_pwd;
        },
        hasRole: function(role){
            return this.roles.indexOf(role) > -1;
        }
    }

    var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = crypt.createSalt();
            hash = crypt.hashPwd(salt, '123');
            User.create({
                firstName: 'A',
                lastName: 'A',
                username: 'admin',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin'],
                recipes: []
            });
            salt = crypt.createSalt();
            hash = crypt.hashPwd(salt, '123');
            User.create({
                firstName: 'Dandy',
                lastName: 'Crocodile',
                username: 'all',
                salt: salt,
                hashed_pwd: hash,
                roles: [],
                recipes: []
            });
            salt = crypt.createSalt();
            hash = crypt.hashPwd(salt, '123');
            User.create({firstName: 'Jerry', lastName: 'Mouse', username: 'mouse', salt: salt, hashed_pwd: hash,  roles: [], recipes: []});

        }
    });
}