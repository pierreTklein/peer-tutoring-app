"use strict";
const VALIDATOR = require("./util.validator");
const Constants = require("../../constants/general.constant");

module.exports = {
    newAccountValidator: [
        VALIDATOR.regexValidator("body", "email", false, Constants.EMAIL_REGEX),
        VALIDATOR.passwordValidator("body", "password", false),

        VALIDATOR.stringValidator("body", "firstName", true),
        VALIDATOR.stringValidator("body", "lastName", true),
        VALIDATOR.stringValidator("body", "pronoun", true),
    ],
    updateAccountValidator: [
        VALIDATOR.regexValidator("body", "email", true, Constants.EMAIL_REGEX),
        VALIDATOR.stringValidator("body", "firstName", true),
        VALIDATOR.stringValidator("body", "lastName", true),
        VALIDATOR.stringValidator("body", "pronoun", true),
    ],
    inviteAccountValidator: [
        VALIDATOR.regexValidator("body", "email", false, Constants.EMAIL_REGEX),
        VALIDATOR.enumValidator("body", "accountType", Constants.USER_TYPES, false)
    ]
};