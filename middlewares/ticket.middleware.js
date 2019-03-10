"use strict";

const _ = require("lodash");

const Constants = {
    Error: require("../constants/error.constant")
};

const Services = {
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
    if (tickets.length > 0) {
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
        createdAt: _.omitBy({
            $lte: req.body.createBefore,
            $gte: req.body.createAfter,
        }, _.isUndefined),
        startedAt: _.omitBy({
            $exists: req.body.started,
            $lte: req.body.startBefore,
            $gte: req.body.startAfter,
        }, _.isUndefined),
        endedAt: _.omitBy({
            $exists: req.body.ended,
            $lte: req.body.endBefore,
            $gte: req.body.endAfter,
        }, _.isUndefined),
        tutorId: _.omitBy({
            $exists: req.body.assigned,
            $eq: req.body.tutorId
        }, _.isUndefined),
        studentId: req.body.studentId,
        courseId: req.body.courseId,
    };
    query = _.omitBy(query, (value) => _.isEmpty(value));
    const tickets = await Services.Ticket.find(query, req.body.expandTutor, req.body.expandStudent, req.body.expandCourse);
    req.body.tickets = tickets;
    next();
}

async function getByUser(req, res, next) {
    let query = {
        $or: [{
                tutorId: req.user.id
            },
            {
                studentId: req.user.id
            }
        ]
    };
    const tickets = await Services.Ticket.find(query, req.body.expandTutor, req.body.expandStudent, req.body.expandCourse);
    req.body.tickets = tickets;
    next();
}

async function getById(req, res, next) {
    const ticket = await Services.Ticket.findById(req.body.id, req.body.expandTutor, req.body.expandStudent, req.body.expandCourse);
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

async function failIfNotAssigned(req, res, next) {
    const ticket = req.body.ticket;
    if (!ticket.tutorId) {
        return next({
            status: 403,
            message: Constants.Error.TICKET_403_MESSAGE
        });
    }
    next();
}


async function failIfStarted(req, res, next) {
    const ticket = req.body.ticket;
    if (ticket.startedAt) {
        return next({
            status: 403,
            message: Constants.Error.TICKET_403_MESSAGE
        });
    }
    next();
}

async function failIfNotStarted(req, res, next) {
    const ticket = req.body.ticket;
    if (!ticket.startedAt) {
        return next({
            status: 403,
            message: Constants.Error.TICKET_403_MESSAGE
        });
    }
    next();
}


async function failIfEnded(req, res, next) {
    const ticket = req.body.ticket;
    if (ticket.endedAt) {
        return next({
            status: 403,
            message: Constants.Error.TICKET_403_MESSAGE
        });
    }
    next();
}

async function failIfNotEnded(req, res, next) {
    const ticket = req.body.ticket;
    if (!ticket.endedAt) {
        return next({
            status: 403,
            message: Constants.Error.TICKET_403_MESSAGE
        });
    }
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
async function abandonTicket(req, res, next) {
    const updatedValue = {
        $unset: {
            tutorId: 1,
            startedAt: 1
        }
    };
    const ticket = await Services.Ticket.updateOne(req.body.id, updatedValue);
    req.body.ticket = ticket;
    next();
}

async function getNewTicketFIFO(req, res, next) {
    const tutor = req.user.tutor;
    const ticket = await Services.Ticket.getNewTicketFIFO(tutor.courses);
    if (!ticket) {
        return next({
            status: 400,
            message: Constants.Error.TICKET_ASSIGN_400_MESSAGE
        });
    }
    req.body.ticket = ticket;
    next();
}

async function getNewTicketOptimized(req, res, next) {
    const tutor = req.user.tutor;
    const ticket = await Services.Ticket.getNewTicketOptimized(tutor.courses);
    req.body.ticket = ticket;
    next();
}

async function assignTicket(req, res, next) {
    req.body.ticket = await Services.Ticket.updateOne(req.body.ticket.id, {
        tutorId: req.user.id
    });
    next();
}

module.exports = {
    getByQuery: Middleware.Util.asyncMiddleware(getByQuery),
    createTicket: Middleware.Util.asyncMiddleware(createTicket),
    getById: Middleware.Util.asyncMiddleware(getById),
    getByUser: Middleware.Util.asyncMiddleware(getByUser),
    getNewTicketFIFO: Middleware.Util.asyncMiddleware(getNewTicketFIFO),
    getNewTicketOptimized: Middleware.Util.asyncMiddleware(getNewTicketOptimized),
    assignTicket: Middleware.Util.asyncMiddleware(assignTicket),
    abandonTicket: Middleware.Util.asyncMiddleware(abandonTicket),
    startTicket: Middleware.Util.asyncMiddleware(startTicket),
    endTicket: Middleware.Util.asyncMiddleware(endTicket),
    rateTicket: Middleware.Util.asyncMiddleware(rateTicket),
    failIfUserHasOpenTicket: Middleware.Util.asyncMiddleware(failIfUserHasOpenTicket),
    failIfStarted: failIfStarted,
    failIfNotStarted: failIfNotStarted,
    failIfEnded: failIfEnded,
    failIfNotEnded: failIfNotEnded,
    failIfNotAssigned: failIfNotAssigned,
};