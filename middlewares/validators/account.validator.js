"use strict";
const VALIDATOR = require("./util.validator");
const Constants = require("../../constants/general.constant");

module.exports = {
    accountExpansionValidator: [
        VALIDATOR.booleanValidator("query", "expandCourse", true),
    ],
    searchAccountValidator: [
        VALIDATOR.stringValidator("body", "firstName", true),
        VALIDATOR.stringValidator("body", "lastName", true),
        VALIDATOR.regexValidator("body", "email", true, Constants.EMAIL_REGEX),
        VALIDATOR.enumArrayValidator("body", "accountType", Constants.USER_TYPES, true),
        VALIDATOR.booleanValidator("body", "isOnDuty", true),
        VALIDATOR.mongoIdArrayValidator("body", "courses", true),
    ],
    newAccountValidator: [
        VALIDATOR.regexValidator("body", "email", false, Constants.EMAIL_REGEX),
        VALIDATOR.passwordValidator("body", "password", false),
        VALIDATOR.jwtValidator("header", "token", process.env.JWT_INVITE_SECRET, true),

        VALIDATOR.stringValidator("body", "firstName", true),
        VALIDATOR.stringValidator("body", "lastName", true),
        VALIDATOR.stringValidator("body", "pronoun", true),
    ],
    updateAccountValidator: [
        VALIDATOR.stringValidator("body", "firstName", true),
        VALIDATOR.stringValidator("body", "lastName", true),
        VALIDATOR.stringValidator("body", "pronoun", true),
    ],
    updateTutorValidator: [
        VALIDATOR.mongoIdArrayValidator("body", "courses", true),
        VALIDATOR.booleanValidator("body", "isOnDuty", true),
    ],
    inviteAccountValidator: [
        VALIDATOR.regexValidator("body", "email", false, Constants.EMAIL_REGEX),
        VALIDATOR.enumArrayValidator("body", "accountType", Constants.USER_TYPES, false)
    ]
};