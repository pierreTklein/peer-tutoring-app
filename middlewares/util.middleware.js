"use strict";

const {
    validationResult
} = require("express-validator/check");
const {
    matchedData
} = require("express-validator/filter");
const Constants = {
    Error: require("../constants/error.constant"),
};

/**
 * Moves matched data to req.body, and fails if any validation fails.
 * @param {*} req 
 * @param {*} res 
 * @param {(err?)=>void} next
 */
function failIfNotValid(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 422,
            message: Constants.Error.VALIDATION_422_MESSAGE,
            data: errors.mapped()
        });
    }
    req.body = matchedData(req);
    return next();
}

/**
 * Wrapper function for all asynchronous middleware, aka middleware that returns promises.
 * @param {(req,res,next:(err?:any)=>void)=>any} fn The function that is asynchronous
 * @returns {(req,res,next:(err?:any)=>void)=>any} Another middleware that, when invoked, will attempt to resolve fn. If there is an error,
 * then it will pass the error to 'next' function.
 */
function asyncMiddleware(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
}

function parseByModel(attribute, model) {
    return (req, res, next) => {
        const details = {};
        for (const val in req.body) {
            // use .hasOwnProperty instead of 'in' to get rid of inherited properties such as 'should'
            if (model.schema.paths.hasOwnProperty(val)) {
                details[val] = req.body[val];
                delete req.body[val];
            }
        }
        req.body[attribute] = details;
        next();
    };
}

function putUserIdInBody(req, res, next) {
    req.body.id = req.user.id;
    next();
}

module.exports = {
    asyncMiddleware: asyncMiddleware,
    failIfNotValid: failIfNotValid,
    parseByModel: parseByModel,
    putUserIdInBody: putUserIdInBody,
};