/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-param-reassign */

'use strict';

/**
 *
 * @param {*} viewData
 * @returns {} viewData which will be used in the template
 */
function addJSONData(viewData) {
    if (!viewData.customHooks) {
        return viewData;
    }

    viewData.customHooks = [{
        text: 'Added from hook',
        rating: 3.5
    }];

    return viewData;
}

module.exports.addJSONData = addJSONData;
