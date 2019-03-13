"use strict";

const jwt = require("jsonwebtoken");
const path = require("path");
const Services = {
    Email: require("./email.service")
};

function generateToken(accountId) {
    const token = jwt.sign({
        accountId: accountId
    }, process.env.JWT_CONFIRM_ACC_SECRET, {
        expiresIn: "1 day"
    });
    return token;
}

/**
 * Generates the link that the user will use to access the Confirm page
 * @param {'http'|'https'} httpOrHttps 
 * @param {string} domain the domain of the current
 * @param {string} token the Confirm token
 * @returns {string} the string, of form: [http|https]://{domain}/confirm?token={token}
 */
function generateTokenLink(address, token) {
    const link = `${address}/account/confirm?token=${token}`;
    return link;
}

/**
 * Generates the mailData for the ConfirmEmail.
 * @param {string} address The web address that the front-end service is running on
 * @param {string} receiverEmail The receiver of the email
 * @param {string} token The Confirmtoken
 */
function generateConfirmAccountEmail(address, receiverEmail, token) {
    const tokenLink = generateTokenLink(address, token);
    if (token === undefined || tokenLink === undefined) {
        return undefined;
    }
    const handlebarPath = path.join(__dirname, `../assets/email/ConfirmAccount.hbs`);
    const mailData = {
        from: process.env.NO_REPLY_EMAIL,
        to: receiverEmail,
        subject: "Request to Confirm Account",
        html: Services.Email.renderEmail(handlebarPath, {
            link: tokenLink
        })
    };
    return mailData;
}


module.exports = {
    generateToken: generateToken,
    generateTokenLink: generateTokenLink,
    generateConfirmAccountEmail: generateConfirmAccountEmail,
};