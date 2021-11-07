'use strict';

/**
 * @namespace Hello
 */

var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');


/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Hello-World
 */

 server.get('World', userLoggedIn.validateLoggedIn, function (req, res, next) {
    res.json({
        message: 'Hello-world'
    });
    next();
});

server.get('World2', function (req, res, next) {
    res.json({
        message: 'Hello-world2'
    });
    next();
});

module.exports = server.exports();
