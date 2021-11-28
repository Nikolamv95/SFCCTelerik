/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */

'use strict';

var server = require('server');
var page = module.superModule;
var HookMgr = require('dw/system/HookMgr');
var hookName = 'addJSONToViewData';
var hookFuncion = 'addJSONData';
server.extend(page);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    if (!viewData) {
        next();
    } else {
        if (HookMgr.hasHook(hookName)) {
            HookMgr.callHook(
                hookName,
                hookFuncion,
                viewData
            );
        }

        if (viewData.customReviews) {
            viewData.customReviews = [{
                text: 'Lorem ipsum dolor sit amet, cibo utroque ne vis, has no sumo graece.',
                rating: 3.5
            }, {
                text: 'Very short review',
                rating: 5
            }, {
                text: 'Lorem ipsum dolor sit amet, cibo utroque ne vis, has no sumo graece.',
                rating: 1.5
            }];
        }
    }

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
