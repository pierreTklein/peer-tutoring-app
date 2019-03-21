"use strict";

const Success = require("../constants/success.constant");

/**
 * Retrieved multiple tickets.
 * @param {*} req 
 * @param {*} res 
 */
function gotTickets(req, res) {
    res.status(200).json({
        message: Success.TICKET_READ,
        data: {
            tickets: req.body.tickets
        }
    });
}

/**
 * Retrieved single ticket.
 * @param {*} req 
 * @param {*} res 
 */
function gotTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_READ,
        data: {
            ticket: req.body.ticket
        }
    });
}

/**
 * Retrieved ticket stats.
 * @param {*} req 
 * @param {*} res 
 */
function gotStats(req, res) {
    res.status(200).json({
        message: Success.TICKET_STATS,
        data: req.body.stats
    });
}

/**
 * Created single ticket.
 * @param {*} req 
 * @param {*} res 
 */
function createdTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_CREATE,
        data: {
            ticket: req.body.ticket
        }
    });
}

/**
 * Started ticket.
 * @param {*} req 
 * @param {*} res 
 */
function startedTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_START,
        data: {
            ticket: req.body.ticket
        }
    });
}

/**
 * Ended ticket.
 * @param {*} req 
 * @param {*} res 
 */
function endedTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_END,
        data: {
            ticket: req.body.ticket
        }
    });
}

/**
 * Rated ticket.
 * @param {*} req 
 * @param {*} res 
 */
function ratedTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_RATE,
        data: {
            ticket: req.body.ticket
        }
    });
}

/**
 * Assigned ticket.
 * @param {*} req 
 * @param {*} res 
 */
function assignedTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_ASSIGNED,
        data: {
            ticket: req.body.ticket
        }
    });
}
/**
 * Assigned ticket.
 * @param {*} req 
 * @param {*} res 
 */
function abandonedTicket(req, res) {
    res.status(200).json({
        message: Success.TICKET_ABANDON,
        data: {
            ticket: req.body.ticket
        }
    });
}
/**
 * Got position in queue.
 * @param {*} req 
 * @param {*} res 
 */
function gotTicketPosition(req, res) {
    res.status(200).json({
        message: Success.TICKET_POSITION,
        data: req.body.position
    });
}


module.exports = {
    assignedTicket: assignedTicket,
    gotTickets: gotTickets,
    gotTicket: gotTicket,
    createdTicket: createdTicket,
    startedTicket: startedTicket,
    endedTicket: endedTicket,
    ratedTicket: ratedTicket,
    abandonedTicket: abandonedTicket,
    gotTicketPosition: gotTicketPosition,
    gotStats: gotStats,
};