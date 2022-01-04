/* eslint-disable linebreak-style */
/* eslint-disable no-else-return */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
'use strict';

function sendSMS(args) {
    let fromNumber = args.fromNumber;
    let textMsg = args.textMsg ;
    let toNumber = args.toNumber;

    var getTwillioService = dw.svc.LocalServiceRegistry.createService("http.twillio.sendSms", {
        createRequest: function (svc) {
            svc.setRequestMethod("POST");
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            const body = "From=" + fromNumber + "&Body=" + textMsg + "&To=" + toNumber;
            return body;
        },

        parseResponse: function (svc, client) {
            return client.text;
        }
    });

    var response = getTwillioService.call().object;
    return response;
}

module.exports = {
    sendSMS: sendSMS
};
