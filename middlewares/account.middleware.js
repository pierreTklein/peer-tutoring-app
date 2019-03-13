"use strict";

const _ = require("lodash");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Services = {
    Logger: require("../services/logger.service"),
    Account: require("../services/account.service"),
    Confirm: require("../services/confirmAccount.service"),
    Invite: require("../services/invite.service"),
    Email: require("../services/email.service"),
    Env: require("../services/env.service"),
};

const Middleware = {
    Util: require("../middlewares/util.middleware")
};

const Constants = {
    Error: require("../constants/error.constant"),
    General: require("../constants/general.constant")
};

async function getByQuery(req, res, next) {
    let query = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        accountType: req.body.accountType,
        tutor: _.omitBy({
            courses: req.body.courses,
            isOnDuty: req.body.isOnDuty
        }, _.isUndefined)
    };
    query = _.omitBy(query, (value) => _.isEmpty(value));
    const accounts = await Services.Account.find(query, req.body.expandCourse);
    req.body.accounts = accounts;
    next();
}

/**
 * @function parsePatch
 * @param {body: {id: ObjectId}} req 
 * @param {*} res 
 * @param {(err?) => void} next 
 * @return {void}
 */
function parsePatch(req, res, next) {
    let accountDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pronoun: req.body.pronoun,
        // Remove all entries that are undefined 
        tutor: _.omitBy({
            courses: req.body.courses,
            isOnDuty: req.body.isOnDuty
        }, _.isUndefined)
    };
    // Remove all entries that are empty 
    req.body.accountDetails = _.omitBy(accountDetails, (value) => _.isEmpty(value));
    return next();
}

/**
 * @function parseAccount
 * @param {{body: Account}} req
 * @param {*} res
 * @param {(err?)=>void} next
 * @return {void}
 * @description 
 * Hashes the password.
 * Adds _id to account.
 */
function parseAccount(req, res, next) {
    const account = {
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        accountType: req.body.accountType,
        courses: req.body.courses,
        password: Services.Account.hashPassword(req.body.password),
    };

    delete req.body.firstName;
    delete req.body.lastName;
    delete req.body.email;
    delete req.body.password;
    delete req.body.accountType;
    delete req.body.courses;

    req.body.account = account;

    return next();
}

/**
 * Middleware that updates the password for the current user
 * @param {{body: {password: string}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next
 */
async function updatePassword(req, res, next) {
    req.body.account = await Services.Account.updatePassword(req.body.decodedToken.accountId, req.body.password);
    return next();
}

/**
 * @async
 * @function getById
 * @param {{body: {id: string, expandCourse?: boolean}}} req
 * @param {*} res
 * @description Retrieves an account's information from mongoId specified in req.body.id, and places it in req.body.account
 */
async function getById(req, res, next) {
    const acc = await Services.Account.findById(req.body.id, req.body.expandCourse);

    if (!acc) {
        return next({
            status: 404,
            message: Constants.Error.ACCOUNT_404_MESSAGE,
            data: {}
        });
    }

    req.body.account = acc;
    return next();
}

/**
 * @async
 * @function getByEmail
 * @param {{user: {email: string, expandCourse?: boolean}}} req
 * @param {*} res
 * @description Gets an account by user email, and sets req.body.acc to the retrived account object if successful.
 */
async function getByEmail(req, res, next) {
    const acc = await Services.Account.findByEmail(req.user.email, req.body.expandCourse);

    if (!acc) {
        return next({
            status: 404,
            message: Constants.Error.ACCOUNT_404_MESSAGE,
            data: {}
        });
    }

    req.body.account = acc;
    next();
}

async function failIfExists(req, res, next) {
    const account = req.body.account;
    const exists = await Services.Account.findByEmail(account.email);
    if (exists) {
        return next({
            status: 422,
            message: Constants.Error.ACCOUNT_DUPLICATE_422_MESSAGE,
            error: {
                route: req.path
            }
        });
    }
    next();
}

function failIfNotTutor(req, res, next) {
    const account = req.body.account;
    if (!account.accountType.includes(Constants.General.TUTOR)) {
        return next({
            status: 403,
            message: Constants.Error.AUTH_403_MESSAGE,
            error: {
                route: req.path
            }
        });
    }
    next();
}

function failIfNotConfirmed(req, res, next) {
    const account = req.body.account;
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

/**
 * @function addAccount
 * @param {{body: {accountDetails: object}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 * @return {void}
 * @description
 * Creates account document after checking if it exists first
 */
async function addAccount(req, res, next) {
    const accountDetails = req.body.account;
    const account = await Services.Account.addOneAccount(accountDetails);
    req.body.account = account;
    return next();
}

/**
 * Updates an account that is specified by req.params.id
 * @param {{params:{id: string}, body: *}} req 
 * @param {*} res 
 * @param {*} next 
 */
async function updateAccount(req, res, next) {
    req.body.account = await Services.Account.updateOne(req.body.id, req.body.accountDetails);
    if (req.body.account) {
        return next();
    } else {
        return next({
            status: 404,
            message: Constants.Error.ACCOUNT_404_MESSAGE,
            data: {
                id: req.body.id
            }
        });
    }
}

/**
 * @function inviteAccount
 * @param {{body: {email: string, accountType: string}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 * @return {void}
 * Creates email to provide a link for the user to create an account
 */
async function inviteAccount(req, res, next) {
    const email = req.body.email;
    const accountType = req.body.accountType;
    const invite = await Services.Invite.create(accountType, email);
    const inviteToken = Services.Invite.generateToken(invite);

    const address = Services.Env.frontendAddress();

    const mailData = Services.Invite.generateInviteMailData(address, email, accountType, inviteToken);
    if (mailData !== undefined) {
        Services.Email.send(mailData, (err) => {
            if (err) {
                next(err);
            } else {
                next();
            }
        });
    } else {
        return next({
            message: Constants.Error.EMAIL_500_MESSAGE,
        });
    }
}
/**
 * Gets all of the invites in the database and adds it to req.body.
 * @param {{}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
async function getInvites(req, res, next) {
    const invites = await Services.Invite.find({});
    req.body.invites = invites;
    next();
}


/**
 * Parses the invite token if it exists and places it inside of req.body.decodedToken
 * @param {{body: {token?: string}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
function verifyInviteTokenIfExists(req, res, next) {
    if (req.body.token) {
        try {
            req.body.decodedToken = jwt.verify(req.body.token, process.env.JWT_INVITE_SECRET);
        } catch (e) {
            next(e);
        }
    }
    next();
}

/**
 * Gets the invite as defined by the decodedToken
 * @param {{body: {decodedToken: {InviteId: string}}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
async function getInviteFromTokenIfExists(req, res, next) {
    if (req.body.decodedToken) {
        const invite = await Services.Invite.findById(req.body.decodedToken.InviteId);
        req.body.invite = invite;
        next();
    } else {
        next();
    }
}

/**
 * Parses the confirmation token and places it inside of req.body.decodedToken
 * @param {{body: {decodedToken: {AccountId: string}}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
function verifyConfirmationToken(req, res, next) {
    try {
        req.body.decodedToken = jwt.verify(req.body["x-conf-token"], process.env.JWT_CONFIRM_ACC_SECRET);
        next();
    } catch (e) {
        next(e);
    }
}

/**
 * Gets account from confirmation token.
 * @param {{body: {decodedToken: {AccountId: string}}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
async function getAccountFromConfirmationToken(req, res, next) {
    const token = req.body.decodedToken;
    const account = await Services.Account.findById(token.accountId);
    req.body.account = account;
    next();
}

/**
 * Confirms an account
 * @param {{body: {account: {id: string}}} req 
 * @param {*} res 
 * @param {(err?)=>void} next 
 */
async function confirmAccount(req, res, next) {
    const account = req.body.account;
    const newAcc = await Services.Account.confirmAccount(account.id);
    req.body.account = newAcc;
    next();
}

/**
 * Returns the type of account based on the confirmation token
 * @param {{body:{decodedToken:{InviteId:string, accountId:string}}}} req 
 * @param {any} res 
 * @param {(err?)=>void} next 
 */
async function setAccountType(req, res, next) {
    if (req.body.invite) {
        const inviteObj = await Services.Invite.findById(req.body.decodedToken.InviteId);
        if (inviteObj) {
            req.body.accountType = inviteObj.accountType;
            return next();
        } else {
            //Either the token was already used, it's invalid, or user does not exist.
            return next({
                status: 401,
                message: Constants.Error.ACCOUNT_TOKEN_401_MESSAGE,
                error: {}
            });
        }
    } else {
        req.body.accountType = [Constants.General.STUDENT];
        next();
    }
}

async function sendConfirmationEmail(req, res, next) {
    const account = req.body.account;
    const email = req.body.account.email;
    const confirmToken = Services.Confirm.generateToken(account.id);
    const address = Services.Env.frontendAddress();

    const mailData = Services.Confirm.generateConfirmAccountEmail(address, email, confirmToken);
    if (mailData !== undefined) {
        await Services.Email.send(mailData);
        return next();
    } else {
        return next({
            message: Constants.Error.EMAIL_500_MESSAGE,
        });
    }
}

module.exports = {
    parsePatch: parsePatch,
    parseAccount: parseAccount,
    failIfExists: Middleware.Util.asyncMiddleware(failIfExists),
    failIfNotTutor: failIfNotTutor,
    failIfNotConfirmed: failIfNotConfirmed,

    getInvites: Middleware.Util.asyncMiddleware(getInvites),
    getByEmail: Middleware.Util.asyncMiddleware(getByEmail),
    getById: Middleware.Util.asyncMiddleware(getById),
    getByQuery: Middleware.Util.asyncMiddleware(getByQuery),

    updatePassword: Middleware.Util.asyncMiddleware(updatePassword),

    addAccount: Middleware.Util.asyncMiddleware(addAccount),
    updateAccount: Middleware.Util.asyncMiddleware(updateAccount),

    verifyConfirmationToken: verifyConfirmationToken,
    getAccountFromConfirmationToken: getAccountFromConfirmationToken,
    sendConfirmationEmail: Middleware.Util.asyncMiddleware(sendConfirmationEmail),
    confirmAccount: Middleware.Util.asyncMiddleware(confirmAccount),

    verifyInviteTokenIfExists: verifyInviteTokenIfExists,
    inviteAccount: Middleware.Util.asyncMiddleware(inviteAccount),
    getInviteFromTokenIfExists: Middleware.Util.asyncMiddleware(getInviteFromTokenIfExists),
    setAccountType: Middleware.Util.asyncMiddleware(setAccountType),
};