"use strict";

const ACCOUNT_GET_BY_EMAIL = "Account found by user email.";
const ACCOUNT_GET_BY_ID = "Account found by user id.";
const ACCOUNT_READ = "Account retrieval successful.";
const ACCOUNT_CREATE = "Account creation successful.";
const ACCOUNT_UPDATE = "Account update successful.";
const ACCOUNT_INVITE = "Account invitation successful.";
const ACCOUNT_GET_INVITES = "Invite retrieval successful.";

const AUTH_LOGIN = "Login successful.";
const AUTH_LOGOUT = "Logout successful.";
const AUTH_SEND_RESET_EMAIL = "Send reset email successful.";
const AUTH_RESET_PASSWORD = "Reset password successful.";
const AUTH_CONFIRM_ACCOUNT = "Confirm account successful.";
const AUTH_SEND_CONFIRMATION_EMAIL = "Send confirmation email successful.";

const TICKET_CREATE = "Ticket creation successful.";
const TICKET_END = "Ticket end successful.";
const TICKET_RATE = "Ticket rate successful.";
const TICKET_READ = "Ticket retrieval successful.";
const TICKET_START = "Ticket start successful.";


module.exports = {
    ACCOUNT_GET_BY_EMAIL: ACCOUNT_GET_BY_EMAIL,
    ACCOUNT_GET_BY_ID: ACCOUNT_GET_BY_ID,
    ACCOUNT_CREATE: ACCOUNT_CREATE,
    ACCOUNT_UPDATE: ACCOUNT_UPDATE,
    ACCOUNT_INVITE: ACCOUNT_INVITE,
    ACCOUNT_GET_INVITES: ACCOUNT_GET_INVITES,
    ACCOUNT_READ: ACCOUNT_READ,
    AUTH_LOGIN: AUTH_LOGIN,
    AUTH_LOGOUT: AUTH_LOGOUT,
    AUTH_SEND_RESET_EMAIL: AUTH_SEND_RESET_EMAIL,
    AUTH_RESET_PASSWORD: AUTH_RESET_PASSWORD,
    AUTH_CONFIRM_ACCOUNT: AUTH_CONFIRM_ACCOUNT,
    AUTH_SEND_CONFIRMATION_EMAIL: AUTH_SEND_CONFIRMATION_EMAIL,

    TICKET_CREATE: TICKET_CREATE,
    TICKET_END: TICKET_END,
    TICKET_RATE: TICKET_RATE,
    TICKET_READ: TICKET_READ,
    TICKET_START: TICKET_START,
};