/* eslint-disable no-unused-vars */
'use strict';

/**
 * @namespace Newsletter
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    consentTracking.consent,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();
        res.render('account/newsletter', {
            newsletterForm: newsletterForm
        });

        next();
    }
);

server.post(
    'Save',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Transaction = require('dw/system/Transaction');
        var Resource = require('dw/web/Resource');
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var URLUtils = require('dw/web/URLUtils');
        const NEWSLETTER_SUBS_CO = 'NEWSLETTER_SUBSCRIPTION';

        // Require newsletter form
        var newsletterForm = server.forms.getForm('newsletter');

        // DO form validation
                                                            // The name of the model, the name of the Primary key
        var newsletterResult = CustomObjectMgr.getCustomObject(NEWSLETTER_SUBS_CO, newsletterForm.email.value);
        if (!empty(newsletterResult)){
            newsletterForm.valid = false;
            newsletterForm.email.valid = false;
            newsletterForm.email.error = Resource.msg('error.message.not.unique', 'forms', null);
        };

        if (newsletterForm.valid) {
            Transaction.wrap(function () {
                                                                    // The name of the model, the name of the Primary key
                var newsletterEntry = CustomObjectMgr.createCustomObject(NEWSLETTER_SUBS_CO, newsletterForm.email.value);
                newsletterEntry.custom.fullName = newsletterForm.fullName.value;
                newsletterEntry.custom.skinType = newsletterForm.skinType.value;
            })
        };

        res.json({
            success: true,
            redirectUrl: URLUtils.url('Newsletter-Show').toString()
        })

        return next();
    }
);

module.exports = server.exports();
