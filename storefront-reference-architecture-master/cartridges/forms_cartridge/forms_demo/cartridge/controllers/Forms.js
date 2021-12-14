'use strict';

/**
 * @namespace Test
 */

 var server = require('server');
 var cache = require('*/cartridge/scripts/middleware/cache');
 var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
 var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

 
server.get('Custom', function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
   
    res.render('/excerciseForms/customForm');
    
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
