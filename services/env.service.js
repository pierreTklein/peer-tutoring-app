"use strict";
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Logger = require("./logger.service");
module.exports = {
    load: function (path) {
        const result = dotenv.config({
            path: path
        });
        return result;
    },
    isDevelopment: function () {
        return process.env.NODE_ENV === "development";
    },
    isProduction: function () {
        return process.env.NODE_ENV === "production";
    },
    isTest: function () {
        return process.env.NODE_ENV === "test";
    }, 
    frontendAddress: function () {
        return this.isProduction() ? process.env.FRONTEND_ADDRESS_PROD : process.env.FRONTEND_ADDRESS_DEV; 
    }
};