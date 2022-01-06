/* eslint-disable linebreak-style */
/* eslint-disable keyword-spacing */
/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var twillioService = require('../twillioService');


module.exports.execute = function () {
    var productIterator = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');

    try {
        if (!productIterator) {
            throw Error('No productIterator available');
        }

        while (productIterator.hasNext()) {
            const fromNumber = '+12677133676';
            var currentProductObj = productIterator.next();
            var productId = currentProductObj.custom.productId;
            var phoneNumbers = currentProductObj.custom.phoneNumbers;
            var product = ProductMgr.getProduct(productId);
            // Chech is the product available
            //var isAvailable = product.getAvailabilityModel().inStock;
            if (false) {
                var phoneNumbersArr = phoneNumbers.split(',');
                for (let index = 0; index < phoneNumbersArr.length; index++) {
                    var args = {
                        fromNumber: fromNumber,
                        textMsg: 'Hi, the product is in stock',
                        toNumber: '+359878309723',
                    };
                    twillioService.sendSMS(args);
                }
                // Dont work
                //CustomObjectMgr.remove(currentProductObj);
            }
        }
    } catch (error) {
        throw Error(error);
    } finally {
        if (productIterator) {
            productIterator.close();
        }
    }
};