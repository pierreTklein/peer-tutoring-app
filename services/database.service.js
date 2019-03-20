"use strict";
const mongoose = require("mongoose");
const logger = require("./logger.service");
const Q = require("q");

const TAG = "[ DATABASE SERVICE ]";
const env = require("./env.service");

// if DB is defined as an env var, it will go there, elsewise, try local
// you ideally set DB to your database uri that the provider gives you
// it should be easily findable

// DATABASE SERVICE
function getAddressFromEnvironment() {
    return (env.isDevelopment()) ?
        process.env.DB_ADDRESS_DEV :
        (env.isProduction()) ?
        process.env.DB_ADDRESS_PROD :
        process.env.DB_ADDRESS_TEST;
}

function getUserFromEnvironment() {
    return (env.isDevelopment()) ?
        process.env.DB_USER_DEV :
        (env.isProduction()) ?
        process.env.DB_USER_PROD :
        process.env.DB_USER_TEST;
}

function getPassFromEnvironment() {
    return (process.env.NODE_ENV === "development") ?
        process.env.DB_PASS_DEV :
        (process.env.NODE_ENV === "production") ?
        process.env.DB_PASS_PROD :
        process.env.DB_PASS_TEST;
}

function getMongodbURI() {
    const user = getUserFromEnvironment();
    const pass = getPassFromEnvironment();
    const address = getAddressFromEnvironment();
    const uri = process.env.MONGODB_URI;
    if (uri) {
        return uri;
    } else {
        return (!!user && !!pass) ? `mongodb://${user}:${pass}@${address}` : `mongodb://${address}`;
    }
}


module.exports = {
    connect: function (app, callback) {
        mongoose.Promise = Q.promise;
        const url = getMongodbURI();
        logger.info(`${TAG} Connecting to db on ${url}`);
        mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(function () {
            logger.info(`${TAG} Connected to database on ${url}`);
            if (app) {
                app.emit("event:connected to db");
            }
            if (callback) {
                callback();
            }
        }, function (error) {
            logger.error(`${TAG} Failed to connect to database at ${url}. Error: ${error}`);
            throw `Failed to connect to database at ${url}`;
        });
    },
    address: getAddressFromEnvironment(),
    readyState: function () {
        return mongoose.connection.readyState;
    }
};