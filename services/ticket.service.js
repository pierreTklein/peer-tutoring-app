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

function getQueue(courseIds, tutorId = undefined, expandTutor = false, expandStudent = false, expandCourse = false) {
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
            $ne: tutorId
        },
        blacklist: {
            $nin: [tutorId]
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

async function getNewTicketOptimized(courseIds, tutorId) {
    /**
     * Get the most recent completed ticket.
     *  If there is no most recent completed ticket from today, then FIFO.
     * Get the queue of tickets that matches the most recent ticket's course.
     *  If there is no queue, then FIFO.
     * Assign the first from the returned queue.
     */
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    const mostRecent = await Ticket.findOne({
        createdAt: {
            $gte: midnight
        },
        tutorId: tutorId,

    }).sort({
        createdAt: -1
    });
    if (!mostRecent) {
        return getNewTicketFIFO(courseIds, tutorId);
    }

    const tickets = await getQueue([mostRecent.courseId], tutorId);
    if (tickets.length === 0) {
        return getNewTicketFIFO(courseIds, tutorId);
    }
    return tickets.length > 0 ? tickets[0] : null;
}

function statObject() {
    this.course = {};
    this.category = {};
    this.total = 0;
}

function addToObj(obj, k) {
    if (!obj[k]) {
        obj[k] = 0;
    }
    obj[k] += 1;
}

/**
 * 
 * @param {Ticket[]} tickets 
 */
function calculateStats(tickets) {
    let totalWait = 0;
    let totalAbandon = 0;

    const stats = {
        total: 0,
        avgWait: 0,
        avgAbandon: 0,
        freqHour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => new statObject()),
        freqDay: [0, 0, 0, 0, 0, 0, 0].map(() => new statObject()),
        freqStudents: {},
        freqTutors: {},
        freqCourses: {},
        freqCourse: {},
        freqCategory: {}
    };
    tickets.forEach((ticket) => {
        const createdAt = new Date(ticket.createdAt);
        const courseName = `${ticket.courseId.dept} ${ticket.courseId.code}`;
        if (ticket.startedAt) {
            const startedAt = new Date(ticket.startedAt);
            totalWait += (startedAt.getTime() - createdAt.getTime());
            addToObj(stats.freqTutors, ticket.tutorId.toString());
        }
        addToObj(stats.freqStudents, ticket.studentId.toString());
        addToObj(stats.freqCourses, courseName);

        totalAbandon += ticket.blacklist ? ticket.blacklist.length : 0;

        stats.total += 1;
        stats.freqHour[createdAt.getHours()].total += 1;
        stats.freqDay[createdAt.getDay()].total += 1;

        addToObj(stats.freqHour[createdAt.getHours()].course, courseName);
        addToObj(stats.freqDay[createdAt.getDay()].course, courseName);

        addToObj(stats.freqHour[createdAt.getHours()].category, ticket.category);
        addToObj(stats.freqDay[createdAt.getDay()].category, ticket.category);

    });
    stats.avgWait = totalWait / Math.max(tickets.length, 1); // ms
    stats.avgAbandon = totalAbandon / Math.max(tickets.length, 1);
    return stats;
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
    calculateStats: calculateStats
};