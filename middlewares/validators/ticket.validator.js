"use strict";
const VALIDATOR = require("./util.validator");

module.exports = {
    SearchTicketValidator: [
        VALIDATOR.dateValidator("query", "createBefore", true),
        VALIDATOR.dateValidator("query", "createAfter", true),

        VALIDATOR.booleanValidator("query", "started", true),
        VALIDATOR.dateValidator("query", "startBefore", true),
        VALIDATOR.dateValidator("query", "startAfter", true),

        VALIDATOR.booleanValidator("query", "ended", true),
        VALIDATOR.dateValidator("query", "endBefore", true),
        VALIDATOR.dateValidator("query", "endAfter", true),
        
        VALIDATOR.mongoIdValidator("query", "tutorId", true),
        VALIDATOR.mongoIdValidator("query", "studentId", true),
        VALIDATOR.mongoIdValidator("query", "courseId", true),
    ],
    PostTicketValidator: [
        VALIDATOR.mongoIdValidator("body", "courseId", false),
        VALIDATOR.asciiValidator("body", "question", false),
    ],
    PatchTicketValidator: [
        VALIDATOR.mongoIdValidator("body", "tutorId", true),
        VALIDATOR.mongoIdValidator("body", "studentId", true),
        VALIDATOR.mongoIdValidator("body", "courseId", true),
        VALIDATOR.asciiValidator("body", "question", true),
    ],
    rateValidator: [
        VALIDATOR.mongoIdValidator("param","id",false),
        VALIDATOR.integerValidator("body", "rating", false, 0, 5)
    ],    
};