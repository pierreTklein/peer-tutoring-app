"use strict";

const ACCOUNT_404_MESSAGE = "Account not found";

const ACCOUNT_TYPE_409_MESSAGE = "Wrong account type";

const VALIDATION_422_MESSAGE = "Validation failed";
const ACCOUNT_DUPLICATE_422_MESSAGE = "Account already exists";

const ACCOUNT_TOKEN_401_MESSAGE = "Invalid token for account";
const AUTH_401_MESSAGE = "Invalid Authentication";

const AUTH_403_MESSAGE = "Invalid Authorization";
const ACCOUNT_403_MESSAGE = "Email address not verified";

const ACCOUNT_UPDATE_500_MESSAGE = "Error while updating account";
const EMAIL_500_MESSAGE = "Error while generating email";
const GENERIC_500_MESSAGE = "Internal error";
const LOGIN_500_MESSAGE = "Error while logging in";

const TICKET_ASSIGN_400_MESSAGE = "No tickets available";
const TICKET_422_MESSAGE = "Duplicate ticket";
const TICKET_404_MESSAGE = "Ticket not found";
const TICKET_403_MESSAGE = "Unable to process ticket update";

const COURSE_404_MESSAGE = "Course not found";

module.exports = {
    ACCOUNT_404_MESSAGE: ACCOUNT_404_MESSAGE,
    ACCOUNT_TYPE_409_MESSAGE: ACCOUNT_TYPE_409_MESSAGE,
    VALIDATION_422_MESSAGE: VALIDATION_422_MESSAGE,
    ACCOUNT_TOKEN_401_MESSAGE: ACCOUNT_TOKEN_401_MESSAGE,
    AUTH_401_MESSAGE: AUTH_401_MESSAGE,
    AUTH_403_MESSAGE: AUTH_403_MESSAGE,
    ACCOUNT_403_MESSAGE: ACCOUNT_403_MESSAGE,
    ACCOUNT_UPDATE_500_MESSAGE: ACCOUNT_UPDATE_500_MESSAGE,
    EMAIL_500_MESSAGE: EMAIL_500_MESSAGE,
    GENERIC_500_MESSAGE: GENERIC_500_MESSAGE,
    ACCOUNT_DUPLICATE_422_MESSAGE: ACCOUNT_DUPLICATE_422_MESSAGE,
    LOGIN_500_MESSAGE: LOGIN_500_MESSAGE,
    TICKET_ASSIGN_400_MESSAGE: TICKET_ASSIGN_400_MESSAGE,
    TICKET_422_MESSAGE: TICKET_422_MESSAGE,
    TICKET_403_MESSAGE: TICKET_403_MESSAGE,
    TICKET_404_MESSAGE: TICKET_404_MESSAGE,
    COURSE_404_MESSAGE: COURSE_404_MESSAGE,
};