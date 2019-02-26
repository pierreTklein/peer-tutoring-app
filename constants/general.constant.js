"use strict";

const SERVICE_NAME = "CSUS Helpdesk";

// constants kept in alphabetical order
// from https://emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// matches optional http://, https://, http:, https:, and optional www.
// matches the domain, and then optional route, path, query parameters
const URL_REGEX = /^(http(s)?:(\/\/)?)?(www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?\/\/=]*)$/;
const ANY_REGEX = /^.+$/;

const STAFF = "Staff";
const TUTOR = "Tutor";
const STUDENT = "Student";

const USER_TYPES = [STAFF, TUTOR, STUDENT];

const EMAIL_SUBJECTS = {};

const ACC_INVITE_EMAIL_SUBJECTS = {};
ACC_INVITE_EMAIL_SUBJECTS[STAFF] = `You've been invited to create a staff account for ${SERVICE_NAME}`;
ACC_INVITE_EMAIL_SUBJECTS[TUTOR] = `You've been invited to create a tutor account for ${SERVICE_NAME}`;
ACC_INVITE_EMAIL_SUBJECTS[STUDENT] = `You've been invited to create a student account for ${SERVICE_NAME}`;

module.exports = {
    SERVICE_NAME: SERVICE_NAME,
    EMAIL_REGEX: EMAIL_REGEX,
    ANY_REGEX: ANY_REGEX,
    USER_TYPES: USER_TYPES,
    URL_REGEX: URL_REGEX,
    EMAIL_SUBJECTS: EMAIL_SUBJECTS,
    ACC_INVITE_EMAIL_SUBJECTS: ACC_INVITE_EMAIL_SUBJECTS,
    STAFF: STAFF,
    TUTOR: TUTOR,
    STUDENT: STUDENT
};