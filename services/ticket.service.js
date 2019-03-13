"use strict";
const Ticket = require("../models/ticket.model");
const logger = require("./logger.service");

/**
 * @function findById
 * @param {ObjectId} id
 * @param {boolean} expandTutor
 * @param {boolean} expandStudent
 * @param {boolean} expandCourse
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Finds a ticket by mongoID.
 */
function findById(id, expandTutor = false, expandStudent = false, expandCourse = false) {
    const TAG = `[Ticket Service # findById]:`;
    const query = {
        _id: id
    };

    const ticket = Ticket.findById(query, logger.queryCallbackFactory(TAG, "Ticket", query));
    return handleExpansion(ticket, expandTutor, expandStudent, expandCourse);
}

/**
 * @function findOne
 * @param {*} query
 * @param {boolean} expandTutor
 * @param {boolean} expandStudent
 * @param {boolean} expandCourse
 * @return {DocumentQuery} The document query will resolve to either Ticket or null.
 * @description Finds an Ticket by some query.
 */
function findOne(query, expandTutor = false, expandStudent = false, expandCourse = false) {
    const TAG = `[Ticket Service # findOne ]:`;

    const ticket = Ticket.findOne(query, logger.queryCallbackFactory(TAG, "Ticket", query));
    return handleExpansion(ticket, expandTutor, expandStudent, expandCourse);
}

/**
 * @function find
 * @param {*} query
 * @param {boolean} expandTutor
 * @param {boolean} expandStudent
 * @param {boolean} expandCourse
 * @return {DocumentQuery[]} The document query will resolve to either Ticket[] or null.
 * @description Finds an Ticket by some query.
 */
function find(query, expandTutor = false, expandStudent = false, expandCourse = false) {
    const TAG = `[Ticket Service # find ]:`;

    const tickets = Ticket.find(query, logger.queryCallbackFactory(TAG, "Ticket", query));
    return handleExpansion(tickets, expandTutor, expandStudent, expandCourse);
}

/**
 * 
 * @param {DocumentQuery} docQuery 
 * @param {boolean} expandTutor 
 * @param {boolean} expandStudent 
 * @param {boolean} expandCourse 
 */
function handleExpansion(docQuery, expandTutor, expandStudent, expandCourse) {
    if (expandTutor) {
        docQuery.populate("tutorId", "firstName lastName tutor");
    }
    if (expandStudent) {
        docQuery.populate("studentId", "firstName lastName");
    }
    if (expandCourse) {
        docQuery.populate("courseId");
    }
    return docQuery.exec();
}

/**
 * @function addOne
 * @param {Ticket} ticketDetails
 * @return {Promise<Account>} The promise will resolve to the account object if save is successful.
 * @description Adds a new account to database.
 */
function addOne(ticketDetails) {
    const ticket = new Ticket(ticketDetails);
    return ticket.save();
}

/**
 * @function updateOne
 * @param {ObjectId} id
 * @param {Ticket} ticketDetails 
 * @return {DocumentQuery} The document query will resolve to either Ticket or null.
 * @description Changes account information to the specified information in ticketDetails.
 */
function updateOne(id, ticketDetails) {
    const TAG = `[Ticket Service # updateOne ]:`;

    const query = {
        _id: id
    };

    return Ticket.findOneAndUpdate(query, ticketDetails, logger.updateCallbackFactory(TAG, "Ticket"));
}

function getQueue(courseIds, invalidStudentId = undefined, expandTutor = false, expandStudent = false, expandCourse = false) {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    const tickets = Ticket.find({
        createdAt: {
            $gte: midnight
        },
        tutorId: {
            $exists: false
        },
        startedAt: {
            $exists: false
        },
        endedAt: {
            $exists: false
        },
        courseId: {
            $in: courseIds
        },
        studentId: {
            $ne: invalidStudentId
        }
    }).sort({
        createdAt: 1
    });
    return handleExpansion(tickets, expandTutor, expandStudent, expandCourse);
}

async function getNewTicketFIFO(courseIds, tutorId) {
    const tickets = await getQueue(courseIds, tutorId);
    return tickets.length > 0 ? tickets[0] : null;
}

function getNewTicketOptimized(courseIds, tutorId) {
    // TODO: Implement this
    return getNewTicketFIFO(courseIds, tutorId);
}

module.exports = {
    find: find,
    addOne: addOne,
    findOne: findOne,
    findById: findById,
    updateOne: updateOne,
    getQueue: getQueue,
    getNewTicketFIFO: getNewTicketFIFO,
    getNewTicketOptimized: getNewTicketOptimized,
};