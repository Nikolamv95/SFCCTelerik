/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);

server.append('EditProfile', function (req, res, next) { 
    var viewData = res.getViewData();

    var profileForm = server.forms.getForm('profile');
    profileForm.customer.profileDetails.interest.value = customer.profile.custom.interest;
    profileForm.customer.profileDetails.countryOfResidence.value = customer.profile.custom.countryOfResidence.value;
    next();
});

server.append('SaveProfile', function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils'); 
    var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');
    var formErrors = require('*/cartridge/scripts/formErrors');
    var viewData = res.getViewData();
    var profileForm = server.forms.getForm('profile');
    
    viewData.interest = profileForm.customer.profileDetails.interest.value;
    viewData.countryOfResidence = profileForm.customer.profileDetails.countryOfResidence.value;

    res.setViewData(viewData);

    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var formInfo = res.getViewData();
        var customer = CustomerMgr.getCustomerByCustomerNumber(
            req.currentCustomer.profile.customerNo
        );
        var profile = customer.getProfile();

            Transaction.wrap(function () {
                profile.custom.interest = formInfo.interest;
                profile.custom.countryOfResidence = formInfo.countryOfResidence;
            });
    });

    next();
});

module.exports = server.exports();