'use strict';

/**
 * @namespace Twillio
*/

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var twillioService = require('*/cartridge/scripts/twillioService');
var Resource = require('dw/web/Resource');

/**
 * ContactUs-Subscribe : This endpoint is called to submit the shopper's contact information in 
 * custom obeject NotifyMeBackInStock if the customer wants to subscribe for specific product
 * @name Twillio-Subscribe
 * @function
 * @memberof Twillio
 * @param {httpparameter} - productId - The product ID
 * @param {httpparameter} - phoneNumber - The phone number which has to be notified
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post('Subscribe', function (req, res, next) {
    const TYPE = 'NotifyMeBackInStock';
    let form = req.form;
    let error = false;

    if (!form) {
        error = true;
    }else {
        var currentSubscriptionObj = CustomObjectMgr.getCustomObject(TYPE, form.productId)

        try {
            if (currentSubscriptionObj === null) {
                Transaction.wrap(function () {
                    let newSubscriptionObj = CustomObjectMgr.createCustomObject(TYPE, form.productId);
                    newSubscriptionObj.custom.phoneNumbers = form.phoneNumber;
                });
            } else {
                // If number doesn't exist update the attribute
                if (!currentSubscriptionObj.custom.phoneNumbers.includes(form.phoneNumber)) {
                    let newPhoneNumbers = currentSubscriptionObj.custom.phoneNumbers.concat(',' + form.phoneNumber);
                    Transaction.wrap(function () {
                        currentSubscriptionObj.custom.phoneNumbers = newPhoneNumbers;
                    });
                }
            }
        } catch (error) {
            error = true;
        }
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
