/* eslint-disable linebreak-style */
/* eslint-disable no-ex-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
'use strict';

/**
 * @namespace Twillio
 */

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

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
    const TYPE = 'NotifyMeBackInStock';
    var form = req.form;
    var error = false;
    var isObjectExist = false;
    var currentObject;

    if (!form) {
        error = true;
    }

    var currentSubscriptionObj = CustomObjectMgr.getCustomObject(TYPE, form.productId)

    try {
        if (!currentSubscriptionObj) {
            Transaction.wrap(function () {
                var newSubscriptionObj = CustomObjectMgr.createCustomObject(TYPE, form.productId);
                newSubscriptionObj.custom.phoneNumbers = form.phoneNumber;
            });
        } else {
            // If number doesn't exist update the attribute
            if (!currentSubscriptionObj.custom.phoneNumbers.includes(form.phoneNumber)) {
                var newPhoneNumbers = currentSubscriptionObj.custom.phoneNumbers.concat(','+ form.phoneNumber);
                Transaction.wrap(function () {
                    currentSubscriptionObj.custom.phoneNumbers =  newPhoneNumbers; 
                });
            }
        }
    } catch (error) {
        error = true;
    }

    if (!error) {
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
