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


module.exports = {
    gotTickets: gotTickets,
    gotTicket: gotTicket,
    createdTicket: createdTicket,
    startedTicket: startedTicket,
    endedTicket: endedTicket,
    ratedTicket: ratedTicket
};