/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable sitegenesis/no-global-require */
/* eslint-disable no-unused-vars */
'use strict';

/**
 * @namespace Telerik
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Telerik-Show : This endpoint is called when a shopper navigates to the telerik page
 * @name Base/Telerik-Show
 * @function
 * @memberof Telerik
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

// ,userLoggedIn.validateLoggedIn
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    res.render('telerik/home', {
        welcomeMsg: 'Welcome message'
    });
    next();
}, pageMetaData.computedPageMetaData);

// server.middleware.include - ако имаме променлива от друг файл и не е дефинирана в inlcude ще гръмне
server.get('Include', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    res.render('telerik/include', {
        welcomeMsg: 'Welcome message'
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('Search', function (req, res, next) {
    var Site = require('dw/system/Site');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');

    var result = new ProductSearchModel();
    var query = req.httpParameterMap.query;
    var format = req.httpParameterMap.format;
    result.setSearchPhrase(query);
    result.search();
  
    res.render('telerik/searchResults', {
        searchResult: result,
        query: query,
        format: format
    });

    next();
}, pageMetaData.computedPageMetaData);


server.get('ShowContent', function (req, res, next) {
   var ContentMgr = require('dw/content/ContentMgr');
   var cid = req.httpParameterMap.cid;
   var content = ContentMgr.getContent(cid);
    res.render('telerik/showContent', {
       content: content
    });

    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
