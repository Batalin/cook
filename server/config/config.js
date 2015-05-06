var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
    development: {
        db: 'mongodb://localhost/cookhub',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://localhost/cookhub',
        port: process.env.PORT || 80
    }
}