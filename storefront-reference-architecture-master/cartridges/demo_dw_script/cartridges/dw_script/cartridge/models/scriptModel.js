'use strict'

/**
 * 
 * @param {dw.customer.Customer} customer 
 * @returns {String} customer ID
 */

 function getCustomerById(customer) {
    return customer.getID();
 }

 function getCustomerByName(customer) {
    return customer.profile.firstName;
 }

/**
 * @constructor
 * @param {dw.customer.Customer} customer 
 */
function ScriptModel(customer){
    this.ID = getCustomerById(customer);
    this.FirstName = getCustomerByName(customer);
}

module.exports = ScriptModel;