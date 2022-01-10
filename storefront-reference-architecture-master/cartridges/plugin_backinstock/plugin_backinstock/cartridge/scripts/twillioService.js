'use strict';

/**
 * Funcion which make call to Twillio API in order to send sms to specific number
 * @param {string} fromNumber Phone number from which the sms will be send
 * @param {string} textMsg Text message which the customer will receive
 * @param {string} toNumber Customer phone number which will receive the sms
 * @returns 
 */
function sendSMS(fromNumber, textMsg, toNumber) {
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

    let response = getTwillioService.call().object;
    return response;
}

module.exports = {
    sendSMS: sendSMS
};
