"use strict";

const Constants = {
    Error: require("../constants/error.constant")
};

const Services = {
    Util: require("../services/util.service"),
    Ticket: require("../services/ticket.service"),
    Env: require("../services/env.service")
};

const Middleware = {
    Util: require("./util.middleware")
};

/**
 * Fail the request if there already is an open ticket for the current user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function failIfUserHasOpenTicket(req, res, next) {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    const query = {
        studentId: req.user.id,
        createdAt: {
            $gte: midnight
        },
        endedAt: {
            $exists: false
        }
    };
    const tickets = await Services.Ticket.find(query);
    if (tickets) {
        return next({
            status: 422,
            message: Constants.Error.TICKET_422_MESSAGE
        });
    } else {
        next();
    }
}

async function getByQuery(req, res, next) {
    let query = {
        createdAt: {
            $lte: req.body.createBefore,
            $gte: req.body.createAfter,
        },
        startedAt: {
            $exists: req.body.started,
            $lte: req.body.startBefore,
            $gte: req.body.startAfter,
        },
        endedAt: {
            $exists: req.body.ended,
            $lte: req.body.endBefore,
            $gte: req.body.endAfter,
        },
        tutorId: req.body.tutorId,
        studentId: req.body.studentId,
        courseId: req.body.courseId,
    };
    query = Services.Util.removeByValue(query, undefined);
    const tickets = await Services.Ticket.find(query);
    req.body.tickets = tickets;
    next();
}

async function getByUser(req, res, next) {
    let query = {
        $or: [
            { tutorId: req.user.id },
            { studentId: req.user.id }
        ]
    };
    const tickets = await Services.Ticket.find(query);
    req.body.tickets = tickets;
    next();
}

async function getById(req, res, next) {
    const ticket = await Services.Ticket.findById(req.body.id);
    if (!ticket) {
        return next({
            status: 404,
            message: Constants.Error.TICKET_404_MESSAGE
        });
    }
    req.body.ticket = ticket;
    next();
}

async function createTicket(req, res, next) {
    const ticketDetails = req.body.ticketDetails;
    ticketDetails.studentId = ticketDetails.studentId || req.user.id;
    const ticket = await Services.Ticket.addOne(req.body.ticketDetails);
    req.body.ticket = ticket;
    next();
}

async function startTicket(req, res, next) {
    const updatedValue = {
        startedAt: Date.now()
    };
    const ticket = await Services.Ticket.updateOne(req.body.id, updatedValue);
    req.body.ticket = ticket;
    next();
}

async function endTicket(req, res, next) {
    const updatedValue = {
        endedAt: Date.now()
    };
    const ticket = await Services.Ticket.updateOne(req.body.id, updatedValue);
    req.body.ticket = ticket;
    next();
}

async function rateTicket(req, res, next) {
    const updatedValue = {
        rating: req.body.rating
    };
    const ticket = await Services.Ticket.updateOne(req.body.id, updatedValue);
    req.body.ticket = ticket;
    next();
}


module.exports = {
    getByQuery: Middleware.Util.asyncMiddleware(getByQuery),
    createTicket: Middleware.Util.asyncMiddleware(createTicket),
    getById: Middleware.Util.asyncMiddleware(getById),
    getByUser: Middleware.Util.asyncMiddleware(getByUser),
    startTicket: Middleware.Util.asyncMiddleware(startTicket),
    endTicket: Middleware.Util.asyncMiddleware(endTicket),
    rateTicket: Middleware.Util.asyncMiddleware(rateTicket),
    failIfUserHasOpenTicket: Middleware.Util.asyncMiddleware(failIfUserHasOpenTicket),
};
