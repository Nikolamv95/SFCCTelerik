'use strict'
var productMgr = require('dw/catalog/ProductMgr');
let customerMgr = require('dw/customer/CustomerMgr')


// 1. Create a function to get product by a given ID
/**
 * 
 * @param {String} productId Expect to be product ID
 * @returns {dw.catalog.Product} product
 */
function getProductById(productId) {
    let product = productMgr.getProduct(productId)
    return product;
}

// 2. Create a function to get product category by given product
/**
 * 
 * @param {dw.catalog.Product} product 
 * @returns {string} primary category id
 */
function getCategoryByProduct(product) {
      return product.primaryCategory.ID;
    //I'm not sure do I have to return only 1 category or all 
    //categories in which the product is assigned, so I wrote the other option
    //return ProductMgr.getProduct(productID).getAllCategories();
}

// 3. Create a function to get different product prices for a given product
/**
 * 
 * @param {dw.catalog.Customer} product 
 * @returns {ProductPriceModel} productPrices
 */
function getProductPrices(product) {
    let productPrices = product.getPriceModel();
    return productPrices
}

// 4. Create a function to get catalog min categories

// 5. Create a function to get customer by ID
/**
 * 
 * @param {String} customerID 
 * @returns {dw.customer.customer}
 */
function getCustomerById(customerID) {
    let customer = customerMgr.getCustomerByCustomerNumber(customerID);
    return customer;
}

// 6. Create a function to check if a given customer is assigned to a given customer group
/**
 * 
 * @param {String} groupID 
 * @returns {Boolean} isInGroup
 */
function isCustomerInGroup(groupID) {
    let isInGroup = customer.isMemberOfCustomerGroup(groupID)
    return isInGroup;
}
