"use strict";
const Account = require("../models/account.model");
const logger = require("./logger.service");
const bcrypt = require("bcrypt");

/**
 * @function findById
 * @param {ObjectId} id
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Finds an account by mongoID.
 */
function findById(id, expandCourse = false) {
    const TAG = `[Account Service # findById]:`;
    const query = {
        _id: id
    };

    const account = Account.findById(query, logger.queryCallbackFactory(TAG, "account", query));
    return handleExpansion(account, expandCourse);
}

/**
 * @function findByEmail
 * @param {String} email 
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Find an account by email.
 */
function findByEmail(email, expandCourse = false) {
    const query = {
        email: email
    };

    return findOne(query, expandCourse);
}

/**
 * @param {String} email
 * @param {String} password
 * @return {Account | null} either account or null
 */
async function getAccountIfValid(email, password) {
    const account = await findByEmail(email);

    if (!!account && account.comparePassword(password)) {
        return account;
    }
    return null;
}

/**
 * @function hashPassword
 * @param {String} password
 * @return {string} hashed password
 * @description Hashes password with bcrypt.
 */
function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

/**
 * @function findOne
 * @param {*} query
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Finds an account by some query.
 */
function findOne(query, expandCourse = false) {
    const TAG = `[Account Service # findOne ]:`;

    const account = Account.findOne(query, logger.queryCallbackFactory(TAG, "account", query));
    return handleExpansion(account, expandCourse);
}

/**
 * @function find
 * @param {*} query
 * @param {boolean} expandCourse
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Finds an account by some query.
 */
function find(query, expandCourse = false) {
    const TAG = `[Account Service # findOne ]:`;

    const account = Account.find(query, logger.queryCallbackFactory(TAG, "account", query));
    return handleExpansion(account, expandCourse);
}

/**
 * @function addOneAccount
 * @param {Account} accountDetails
 * @return {Promise<Account>} The promise will resolve to the account object if save is successful.
 * @description Adds a new account to database.
 */
function addOneAccount(accountDetails) {
    const account = new Account(accountDetails);
    return account.save();
}

/**
 * @function updateOne
 * @param {ObjectId} id
 * @param {Account} accountDetails 
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Changes account information to the specified information in accountDetails.
 */
function updateOne(id, accountDetails) {
    const TAG = `[Account Service # updateOne ]:`;

    const query = {
        _id: id
    };

    return Account.findOneAndUpdate(query, accountDetails, logger.updateCallbackFactory(TAG, "account"));
}

/**
 * Updates the password for an account. This function also hashes the password.
 * @param {ObjectId} id String representing the ObjectId of the account
 * @param {string} newPassword the new password for the account (in plain-text).
 */
function updatePassword(id, newPassword) {
    const hashed = hashPassword(newPassword);
    return updateOne(id, {
        password: hashed
    });
}

/**
 * 
 * @param {DocumentQuery} docQuery 
 * @param {boolean} expandCourse 
 */
function handleExpansion(docQuery, expandCourse) {
    if (expandCourse) {
        docQuery.populate("tutor.courses");
    }
    return docQuery.exec();
}


module.exports = {
    find: find,
    findOne: findOne,
    findById: findById,
    findByEmail: findByEmail,
    addOneAccount: addOneAccount,
    getAccountIfValid: getAccountIfValid,
    hashPassword: hashPassword,
    updateOne: updateOne,
    updatePassword: updatePassword
};