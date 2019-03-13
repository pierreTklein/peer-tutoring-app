"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const _ = require("lodash");

const Services = {
    Auth: require("../services/auth.service"),
    ResetPasswordToken: require("../services/resetPassword.service"),
    Account: require("../services/account.service"),
    Email: require("../services/email.service"),
    Invite: require("../services/invite.service"),
    Env: require("../services/env.service")
};

const Middleware = {
    Util: require("./util.middleware")
};

const Constants = {
    General: require("../constants/general.constant"),
    Error: require("../constants/error.constant"),
};

/**
 * @param {*} req
 * @param {*} res
 * @param {(err?)=>void} next 
 * Calls passport.authenticate with a custom error handler. Errors during authentication will return res with a generic 500 error, 
 * Failed authentication returns a AUTH 401 error, and errors during login will return res with a LOGIN 500 error.
 */
function login(req, res, next) {
    passport.authenticate("emailAndPass",
        function (err, user) {
            if (err) {
                return next({
                    status: 500,
                    message: Constants.Error.GENERIC_500_MESSAGE,
                    error: {}
                });
            }
            if (!user) {
                return next({
                    status: 401,
                    message: Constants.Error.AUTH_401_MESSAGE,
                    error: {}
                });
            }
            req.login(user, (loginErr) => {
                if (loginErr) {
                    return next({
                        status: 500,
                        message: Constants.Error.LOGIN_500_MESSAGE,
                        error: {}
                    });
                }
                req.body.account = user;
                return next();
            });
        })(req, res, next);
}

/**
 * @returns {Fn} the middleware that will check that the user is properly authenticated.
 * Calls next() if the user is properly authenticated.
 */
function ensureAuthenticated() {
    return function (req, res, next) {
        if (req.isUnauthenticated()) {
            return next({
                status: 401,
                message: Constants.Error.AUTH_401_MESSAGE,
                error: {
                    route: req.path
                }
            });
        } else {
            return next();
        }
    };
}

/**
 * @param {String[]} accountType the valid user types.
 * @returns {Fn} the middleware that will check that the user is properly authorized.
 * Calls next() if the user is properly authorized.
 */
function ensureAuthorized(accountType) {
    return function (req, res, next) {
        const isAuthorized = _.intersection(req.user.accountType, accountType).length > 0;
        if (!isAuthorized) {
            return next({
                status: 403,
                message: Constants.Error.AUTH_403_MESSAGE
            });
        }
        next();
    };
}

function ensureConfirmed(req, res, next) {
    const account = req.user;
    if (!account.confirmed) {
        return next({
            status: 403,
            message: Constants.Error.ACCOUNT_403_MESSAGE,
            error: {
                route: req.path
            }
        });
    }
    next();
}

function ensureNotConfirmed(req, res, next) {
    const account = req.user;
    if (account.confirmed) {
        return next({
            status: 403,
            message: Constants.Error.ACCOUNT_403_MESSAGE,
            error: {
                route: req.path
            }
        });
    }
    next();
}

/**
 * Checks that the oldPassword is the current password for the logged in user. If the password is correct,
 * then updates the password to the string in newPassword.
 * @param {{user: {email: string}, body: {oldPassword: string, newPassword: string}} req 
 * @param {*} res 
 * @param {*} next 
 */
async function changePassword(req, res, next) {
    const acc = await Services.Account.getAccountIfValid(req.user.email, req.body.oldPassword);
    // user's old password is correct
    if (!!acc) {
        req.body.account = await Services.Account.updatePassword(req.user.id, req.body.newPassword);
        return next();
    } else {
        return next({
            status: 401,
            message: Constants.Error.AUTH_401_MESSAGE,
        });
    }
}

/**
 * Middleware that sends an email to reset the password for the inputted email address.
 * @param {{body: {email:String}}} req the request object
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
async function sendResetPasswordEmailMiddleware(req, res, next) {
    const user = await Services.Account.findByEmail(req.body.email);
    if (user) {
        //create the reset password token
        await Services.ResetPasswordToken.create(user.id);
        //find the thing we just created
        const ResetPasswordTokenModel = await Services.ResetPasswordToken.findByAccountId(user.id);
        //generate email
        const token = Services.ResetPasswordToken.generateToken(ResetPasswordTokenModel.id, user.id);
        const address = Services.Env.isProduction() ? process.env.FRONTEND_ADDRESS_PROD : process.env.FRONTEND_ADDRESS_DEV;
        const mailData = Services.ResetPasswordToken.generateResetPasswordEmail(address, req.body.email, token);
        if (mailData !== undefined) {
            Services.Email.send(mailData, (err) => {
                if (err) {
                    return next(err);
                } else {
                    return next();
                }
            });
        } else {
            return next({
                message: Constants.Error.EMAIL_500_MESSAGE,
            });
        }
    } else {
        //Didn't find the user, but we don't want to throw an error because someone might be trying to see who has an account.
        return next();
    }
}

/**
 * Attempts to parse the jwt token that is found in req.body.token using process.env.JWT_RESET_PWD_SECRET as the key.
 * Places the parsed object into req.body.decodedToken.
 * @param {{body:{token:string}}} req 
 * @param {any} res 
 * @param {(err?)=>void} next 
 */
function parseResetToken(req, res, next) {
    jwt.verify(req.body["x-reset-token"], process.env.JWT_RESET_PWD_SECRET, function (err, decoded) {
        if (err) {
            return next(err);
        } else {
            req.body.decodedToken = decoded;
            return next();
        }
    });
}

/**
 * Verifies that the resetId exists, and that the accountId exists.
 * @param {{body:{decodedToken:{resetId:string, accountId:string}}}} req 
 * @param {any} res 
 * @param {(err?)=>void} next 
 */
async function validateResetToken(req, res, next) {
    const resetObj = await Services.ResetPasswordToken.findById(req.body.decodedToken.resetId);
    const userObj = await Services.Account.findById(req.body.decodedToken.accountId);
    if (resetObj && userObj) {
        req.body.user = userObj;
        return next();
    } else {
        //Either the token was already used, it's invalid, or user does not exist.
        return next({
            status: 401,
            message: Constants.Error.ACCOUNT_TOKEN_401_MESSAGE,
            error: {}
        });
    }
}

/**
 * Middleware that deletes the reset token in the db
 * @param {{body: {decodedToken:{resetId:String}}}} req the request object
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
function deleteResetToken(req, res, next) {
    Services.ResetPasswordToken.deleteToken(req.body.decodedToken.resetId).then(
        () => {
            return next();
        },
        (err) => {
            return next(err);
        }
    );
}

module.exports = {
    //for each route, set up an authentication middleware for that route
    login: login,
    ensureAuthenticated: ensureAuthenticated,
    ensureAuthorized: ensureAuthorized,
    ensureConfirmed: ensureConfirmed,
    ensureNotConfirmed: ensureNotConfirmed,
    sendResetPasswordEmailMiddleware: Middleware.Util.asyncMiddleware(sendResetPasswordEmailMiddleware),
    parseResetToken: parseResetToken,
    validateResetToken: Middleware.Util.asyncMiddleware(validateResetToken),
    deleteResetToken: deleteResetToken,
    changePassword: Middleware.Util.asyncMiddleware(changePassword),
};