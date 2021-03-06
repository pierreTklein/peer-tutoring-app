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
function findById(
    id,
    expandTutor = false,
    expandStudent = false,
    expandCourse = false
) {
    const TAG = `[Ticket Service # findById]:`;
    const query = {
        _id: id
    };

    const ticket = Ticket.findById(
        query,
        logger.queryCallbackFactory(TAG, "Ticket", query)
    );
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
function findOne(
    query,
    expandTutor = false,
    expandStudent = false,
    expandCourse = false
) {
    const TAG = `[Ticket Service # findOne ]:`;

    const ticket = Ticket.findOne(
        query,
        logger.queryCallbackFactory(TAG, "Ticket", query)
    );
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
function find(
    query,
    expandTutor = false,
    expandStudent = false,
    expandCourse = false
) {
    const TAG = `[Ticket Service # find ]:`;

    const tickets = Ticket.find(
        query,
        logger.queryCallbackFactory(TAG, "Ticket", query)
    );
    return handleExpansion(tickets, expandTutor, expandStudent, expandCourse);
}

/**
 *
 * @param {DocumentQuery<any[], any, {}>} docQuery
 * @param {boolean} expandTutor
 * @param {boolean} expandStudent
 * @param {boolean} expandCourse
 * @returns {Promise<Array>}
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

    return Ticket.findOneAndUpdate(
        query,
        ticketDetails,
        logger.updateCallbackFactory(TAG, "Ticket")
    );
}

/**
 *
 * @param {string[]} courseIds
 * @param {string} tutorId
 * @param {boolean} expandTutor
 * @param {boolean} expandStudent
 * @param {boolean} expandCourse
 * @returns {Promise<Array>}
 */
function getQueue(
    courseIds,
    tutorId = undefined,
    expandTutor = false,
    expandStudent = false,
    expandCourse = false
) {
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
    const mostRecent = await Ticket.find({
        createdAt: {
            $gte: midnight
        },
        tutorId: tutorId
    }).sort({
        createdAt: -1
    }).limit(1);
    if (mostRecent.length === 0) {
        return getNewTicketFIFO(courseIds, tutorId);
    }
    // sorted tickets
    const tickets = await getQueue(courseIds, tutorId);
    const now = new Date();
    const FOURTY_FIVE_MIN = 1000 * 60 * 45;
    for (const ticket of tickets) {
        if (now.getTime() - new Date(ticket.createdAt).getTime() > FOURTY_FIVE_MIN) {
            return ticket;
        } else if (ticket.courseId.toString() === mostRecent[0].courseId.toString()) {
            return ticket;
        }
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
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight

    let totalWait = 0;
    let totalSessionTime = 0;

    const stats = {
        total: 0,
        minWait: Infinity,
        maxWait: 0,
        avgWait: 0,
        totalAbandon: 0,
        avgSessionTime: 0,
        totalComplete: 0,
        totalNoTutor: 0,
        totalNotEnded: 0,
        totalCurWaiting: 0,
        freqHour: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ].map(() => new statObject()),
        freqDay: [0, 0, 0, 0, 0, 0, 0].map(() => new statObject()),
        freqStudents: {},
        freqTutors: {},
        freqCourses: {},
        freqCourse: {},
        freqCategory: {}
    };
    tickets.forEach(ticket => {
        const createdAt = new Date(ticket.createdAt);
        const courseName = `${ticket.courseId.dept} ${ticket.courseId.code}`;
        let wait = 0;
        if (ticket.startedAt) {
            const startedAt = new Date(ticket.startedAt);
            wait = startedAt.getTime() - createdAt.getTime();
        } else if (ticket.assignedAt) {
            const assignedAt = new Date(ticket.assignedAt);
            wait = assignedAt.getTime() - createdAt.getTime();
        } else if (ticket.endedAt) {
            const endedAt = new Date(ticket.endedAt);
            wait = endedAt.getTime() - createdAt.getTime();
        } else if (createdAt.getTime() > midnight.getTime()) {
            stats.totalCurWaiting += 1;
            wait = new Date().getTime() - createdAt.getTime();
        }
        totalWait += wait;
        stats.minWait = Math.min(stats.minWait, wait);
        stats.maxWait = Math.max(stats.maxWait, wait);

        if (ticket.tutorId) {
            addToObj(stats.freqTutors, ticket.tutorId.toString());
        } else {
            stats.totalNoTutor += 1;
        }

        if (ticket.endedAt) {
            stats.totalComplete += 1;
        } else {
            stats.totalNotEnded += 1;
        }

        if (ticket.endedAt && ticket.startedAt) {
            const startedAt = new Date(ticket.startedAt);
            const endedAt = new Date(ticket.endedAt);
            totalSessionTime += endedAt.getTime() - startedAt.getTime();
        }

        addToObj(stats.freqStudents, ticket.studentId.toString());
        addToObj(stats.freqCourses, courseName);

        const blacklists = ticket.blacklist ?
            ticket.blacklist.map(b => b.toString()) : [];
        stats.totalAbandon += new Set(blacklists).size;

        stats.total += 1;
        stats.freqHour[createdAt.getHours()].total += 1;
        stats.freqDay[createdAt.getDay()].total += 1;

        addToObj(stats.freqHour[createdAt.getHours()].course, courseName);
        addToObj(stats.freqDay[createdAt.getDay()].course, courseName);

        addToObj(stats.freqHour[createdAt.getHours()].category, ticket.category);
        addToObj(stats.freqDay[createdAt.getDay()].category, ticket.category);
    });
    stats.minWait = stats.minWait === Infinity ? 0 : stats.minWait;
    stats.avgWait = totalWait / Math.max(tickets.length, 1); // ms
    stats.avgSessionTime = totalSessionTime / Math.max(tickets.length, 1); // ms
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