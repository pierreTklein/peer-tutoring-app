"use strict";
const VALIDATOR = require("./util.validator");

module.exports = {
    TicketExpansionValidator: [
        VALIDATOR.booleanValidator("query", "expandTutor", true),
        VALIDATOR.booleanValidator("query", "expandCourse", true),
        VALIDATOR.booleanValidator("query", "expandStudent", true),
    ],

    SearchTicketValidator: [
        VALIDATOR.dateValidator("query", "createBefore", true),
        VALIDATOR.dateValidator("query", "createAfter", true),

        VALIDATOR.booleanValidator("query", "started", true),
        VALIDATOR.dateValidator("query", "startBefore", true),
        VALIDATOR.dateValidator("query", "startAfter", true),

        VALIDATOR.booleanValidator("query", "ended", true),
        VALIDATOR.dateValidator("query", "endBefore", true),
        VALIDATOR.dateValidator("query", "endAfter", true),

        VALIDATOR.booleanValidator("query", "assigned", true),
        VALIDATOR.mongoIdValidator("query", "tutorId", true),

        VALIDATOR.mongoIdValidator("query", "studentId", true),
        VALIDATOR.mongoIdValidator("query", "courseId", true),
    ],
    PostTicketValidator: [
        VALIDATOR.mongoIdValidator("body", "courseId", false),
        VALIDATOR.stringValidator("body", "question", false),
    ],
    PatchTicketValidator: [
        VALIDATOR.mongoIdValidator("body", "tutorId", true),
        VALIDATOR.mongoIdValidator("body", "studentId", true),
        VALIDATOR.mongoIdValidator("body", "courseId", true),
        VALIDATOR.stringValidator("body", "question", true),
    ],
    rateValidator: [
        VALIDATOR.mongoIdValidator("param", "id", false),
        VALIDATOR.integerValidator("body", "rating", false, 0, 5)
    ],
};