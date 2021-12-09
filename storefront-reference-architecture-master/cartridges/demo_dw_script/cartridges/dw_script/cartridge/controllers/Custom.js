'use strict';

/**
 * @namespace Custom
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var ScriptModel = require('*/cartridge/models/scriptModel')

/**
 * Custom-Show : This endpoint is called when a shopper navigates to the Custom page
 * @name Base/Custom-Show
 * @function
 * @memberof Custom
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');


    let scriptModel = new ScriptModel(customer);
    res.render('show', scriptModel);
    next();
});

module.exports = server.exports();
