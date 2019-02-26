"use strict";

/**
 * Recursively remove all of the attributes who have a given value.
 * @param {*} obj an object
 * @param {*} value the value that needs to be removed (strictly equal)
 */
function removeByValue(obj, value) {
    Object.keys(obj).forEach(function (key) {
        if (obj[key] && typeof obj[key] === "object") { 
            removeByValue(obj[key], value);
        }
        else if (obj[key] === value) {
            delete obj[key];
        }
    });
};

module.exports = {
    removeByValue: removeByValue
};