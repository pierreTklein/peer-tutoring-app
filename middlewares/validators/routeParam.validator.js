"use strict";
const VALIDATOR = require("./util.validator");

module.exports = {
    idValidator: [
        VALIDATOR.mongoIdValidator("param", "id", false),
    ],

    tutorIdValidator: [
        VALIDATOR.mongoIdValidator("param", "tutorId", false),
    ],

    studentIdValidator: [
        VALIDATOR.mongoIdValidator("param", "studentId", false),
    ],
};