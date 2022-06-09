/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable sitegenesis/no-global-require */
/* eslint-disable no-unused-vars */
'use strict';

/**
 * @namespace Weather
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var weatherService = require('*/cartridge/scripts/weatherService.js');


/**
 * Weather-Berlin: Render the weather in Berlin information
 * @name Weather-Berlin:
 * @memberof Weather
 * @param {middleware} - cache.applyDefaultCache

 */

server.get('Berlin', cache.applyDefaultCache, function (req, res, next) {  
    var weatherBerlin = JSON.parse(weatherService.getWeatherBerlin());
    res.render('weather', {
        weatherBerlin: weatherBerlin
    });
    next();
});

module.exports = server.exports();