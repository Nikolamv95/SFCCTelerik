'use strict';

/**
 * If the resource to add is not already in the resource array then add it to the array
 * @param {Array} resourceArray - Either the scripts or styles array to which you want to add the resource src to.
 */
function getWeatherBerlin() {

    // Step 1 - Declare the service and create it
    var getWeatherService = dw.svc.LocalServiceRegistry.createService("http.weather.getcity", {

        // Step 2 - Create the lifecycle functions (callbacks)
        // Create the request
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args;
        },


        // Receive the response
        parseResponse: function (svc, client) {
            return client.text;
        },

        filterLogMessage: function (msg) {
            if (msg && msg.includes('coord')) {
                var object = JSON.parse(msg);
                object.base = '$$$$$$$$$$';
                return object.base;
            } else {
                return '';
            }            
        }
    });

    // Step 3 - Call the service
    var response = getWeatherService.call().object;
    return response;
}

module.exports = {
    getWeatherBerlin: getWeatherBerlin
};
