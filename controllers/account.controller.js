"use strict";
const Constants = {
    Success: require("../constants/success.constant")
};

/**
 * @function gotAccount
 * @param {{body: {account: Object}}} req
 * @param {*} res
 * @return {JSON} Success status and account object
 * @description Returns the JSON of account object located in req.body.account
 */
function gotAccount(req, res) {
    const acc = req.body.account;
    return res.status(200).json({
        message: Constants.Success.ACCOUNT_READ,
        data: acc.toStrippedJSON()
    });
}

/**
 * @function gotAccount
 * @param {{body: {accounts: Object[]}}} req
 * @param {*} res
 * @return {JSON} Success status and account objects
 * @description Returns the JSON of account objects located in req.body.accounts
 */
function gotAccounts(req, res) {
    const accs = req.body.accounts;
    const strippedAccs = [];
    for (const acc of accs) {
        strippedAccs.push(acc.toStrippedJSON());
    }
    return res.status(200).json({
        message: Constants.Success.ACCOUNT_READ,
        data: strippedAccs
    });
}

/**
 * @function addUser
 * @param {{body: {accountDetails: {_id: ObjectId }}}} req
 * @param {*} res
 * @return {JSON} Success status
 * @description Adds a user from information in req.body.accountDetails
 */
function addedAccount(req, res) {
    const acc = req.body.account;
    return res.status(200).json({
        message: Constants.Success.ACCOUNT_CREATE,
        data: acc.toStrippedJSON()
    });
}

/**
 * @function updatedAccount
 * @param {{body: {Object}}} req
 * @param {*} res
 * @return {JSON} Success or error status
 * @description
 *      Returns a 200 status for an updated account.
 *      The new account information is located in req.body.
 *      The id is moved to req.body.id from req.params.id by validation.
 */
function updatedAccount(req, res) {
    const acc = req.body.account;
    return res.status(200).json({
        message: Constants.Success.ACCOUNT_UPDATE,
        data: acc.toStrippedJSON()
    });
}

function invitedAccount(req, res) {
    return res.status(200).json({
        message: Constants.Success.ACCOUNT_INVITE,
        data: {}
    });
}

function gotInvites(req, res) {
    return res.status(200).json({
        message: Constants.Success.ACCOUNT_GET_INVITES,
        data: {
            invites: req.body.invites
        }
    });
}

module.exports = {
    addedAccount: addedAccount,
    gotInvites: gotInvites,
    updatedAccount: updatedAccount,
    invitedAccount: invitedAccount,
    gotAccount: gotAccount,
    gotAccounts: gotAccounts
};