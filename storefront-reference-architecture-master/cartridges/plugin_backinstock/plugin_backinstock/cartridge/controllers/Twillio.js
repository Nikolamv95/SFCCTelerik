/* eslint-disable linebreak-style */
'use strict';

/**
 * @namespace Twillio
 */

var server = require('server');

/**
 * ContactUs-Subscribe : This endpoint is called to submit the shopper's contact information
 * @name Base/Twillio-Subscribe
 * @function
 * @memberof Twillio
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - productId - The product ID
 * @param {httpparameter} - phoneNumber - The phone number which has to be notified
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post('Subscribe', server.middleware.https, function (req, res, next) {
    // Validate phoneNumber in middleware
    var Resource = require('dw/web/Resource');
    var myForm = req.form;

    if (true) {
        var contactDetails = [myForm.productId, myForm.contactEmail];
        res.json({
            success: true,
            msg: Resource.msg('success.label', 'common', null)
        });
    } else {
        res.json({
            error: true,
            msg: Resource.msg('failure.label', 'common', null)
        });
    }

    next();
});

module.exports = server.exports();
