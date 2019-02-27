"use strict";
const Ticket = require("../models/ticket.model");
const logger = require("./logger.service");

/**
 * @function findById
 * @param {ObjectId} id
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Finds a ticket by mongoID.
 */
function findById(id) {
    const TAG = `[Ticket Service # findById]:`;
    const query = {
        _id: id
    };

    return Ticket.findById(query, logger.queryCallbackFactory(TAG, "Ticket", query));
}

/**
 * @function findOne
 * @param {*} query
 * @return {DocumentQuery} The document query will resolve to either Ticket or null.
 * @description Finds an Ticket by some query.
 */
function findOne(query) {
    const TAG = `[Ticket Service # findOne ]:`;

    return Ticket.findOne(query, logger.queryCallbackFactory(TAG, "Ticket", query));
}

/**
 * @function find
 * @param {*} query
 * @return {DocumentQuery[]} The document query will resolve to either Ticket[] or null.
 * @description Finds an Ticket by some query.
 */
function find(query) {
    const TAG = `[Ticket Service # find ]:`;

    return Ticket.find(query, logger.queryCallbackFactory(TAG, "Ticket", query));
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

async function getNewTicketFIFO(courseIds) {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    const tickets = await Ticket.find({
        createdAt: {
            $gte: midnight
        },
        startedAt: {
            $exists: false
        },
        courseId: {
            $in: courseIds
        }
    }).sort({
        createdAt: 1
    });
    
    return tickets.length > 0 ? tickets[0] : null;
}

async function getNewTicketOptimized(courseIds) {
    // TODO: Implement this
    return getNewTicketFIFO(courseIds);
}

module.exports = {
    find: find,
    addOne: addOne,
    findOne: findOne,
    findById: findById,
    updateOne: updateOne,
    getNewTicketFIFO: getNewTicketFIFO,
    getNewTicketOptimized: getNewTicketOptimized,
};