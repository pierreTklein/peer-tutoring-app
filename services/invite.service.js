"use strict";
const logger = require("./logger.service");
const Invite = require("../models/invite.model");
const Constants = require("../constants/general.constant");
const jwt = require("jsonwebtoken");
const path = require("path");
const Services = {
    Email: require("./email.service")
};


/**
 * @function findById
 * @param {ObjectId} id
 * @return {DocumentQuery} The document query will resolve to either account invite or null.
 * @description Finds an account by mongoID.
 */
function findById(id) {
    const TAG = `[ Invite Service # findById ]`;
    return Invite.findById(id, logger.queryCallbackFactory(TAG, "Invite", "mongoId"));
}

/**
 * @function find 
 * @param {*} query the query to search the database by.
 * @return {DocumentQuery<any[]>} The document query will resolve to either account invite or null.
 * @description Finds an account by query.
 */
function find(query) {
    const TAG = `[ AccountConfirmation Service # find ]`;
    return Invite.find(query, logger.queryCallbackFactory(TAG, "Invite", query));
}

/**
 * Creates Account Confirmation document in the database
 * @param {String} type the type of user which to create the token for
 * @param {String} email
 * @returns {Promise.<*>}
 */
function create(type, email) {
    //Create new instance of account confirmation
    const invite = new Invite({
        accountType: type,
        email: email
    });
    return invite.save();
}

/**
 * Generates JWT for Inviting account
 * @param {ObjectId} invite
 */
function generateToken(invite) {
    const token = jwt.sign({
        InviteId: invite.id,
    }, process.env.JWT_INVITE_SECRET, {
        expiresIn: "7 day"
    });
    return token;
}

/**
 * Generates the link that the user will use to create account
 * @param {'http'|'https'} httpOrHttps 
 * @param {string} domain the domain of the current
 * @param {string} token the reset token
 * @returns {string} the string, of form: [http|https]://{domain}/account/create?token={token}
 */
function generateInviteTokenLink(address, token) {
    const link = `${address}/account/new?token=${token}`;
    return link;
}
/**
 * Generates the mailData for the account invite Email.
 * @param {string} address The hostname that this service is running on
 * @param {string} receiverEmail The receiver of the email
 * @param {string[]} accountType the user type
 * @param {string} token The account invite token
 */
function generateInviteMailData(address, receiverEmail, accountType, token) {
    const tokenLink = generateInviteTokenLink(address, token);
    let emailSubject = `You've been invited to create a ${accountType.join(", ")} account for ${Constants.SERVICE_NAME}`;
    if (token === undefined || tokenLink === undefined) {
        return undefined;
    }
    const handlebarPath = path.join(__dirname, `../assets/email/AccountInvite.hbs`);
    const mailData = {
        from: process.env.NO_REPLY_EMAIL,
        to: receiverEmail,
        subject: emailSubject,
        html: Services.Email.renderEmail(handlebarPath, {
            link: tokenLink
        })
    };
    return mailData;
}

module.exports = {
    find: find,
    findById: findById,
    create: create,
    generateToken: generateToken,
    generateInviteMailData: generateInviteMailData,
};