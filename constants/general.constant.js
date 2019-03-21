"use strict";

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

module.exports = {
    EMAIL_REGEX: EMAIL_REGEX,
    ANY_REGEX: ANY_REGEX,
    USER_TYPES: USER_TYPES,
    URL_REGEX: URL_REGEX,
    STAFF: STAFF,
    TUTOR: TUTOR,
    STUDENT: STUDENT
};