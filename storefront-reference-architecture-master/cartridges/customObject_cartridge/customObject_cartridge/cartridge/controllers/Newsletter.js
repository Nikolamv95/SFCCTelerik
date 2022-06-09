'use strict';

/**
 * @namespace Newsletter
 */

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var UUIDUtils = require('dw/util/UUIDUtils');

/**
 * Method which process the data and store it in a custom object with attributes: firstName, lastName, email, gender
 */
server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var form = req.form;
    var error = false;

    if (!form) {
        error = true;
    };

    var type = 'NewsletterSubscription';
    var keyValue = UUIDUtils.createUUID();

    try {
        Transaction.wrap(function () {
            var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
            newsletter.custom.firstName = form.firstName;
            newsletter.custom.lastName = form.lastName;
            newsletter.custom.email = form.email;
            form.gender ? newsletter.custom.gender = form.gender : newsletter.custom.gender = '';
        });
    } catch (error) {
        error = true;
    }

    if (error) {
        res.json({
            error: true
        });
    } else {
        res.json({
            error: false,
            id: keyValue
        });
    }

    return next();
});

module.exports = server.exports();
