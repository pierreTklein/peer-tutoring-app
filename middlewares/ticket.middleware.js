"use strict";

const _ = require("lodash");
const mongoose = require("mongoose");
const Constants = {
    Error: require("../constants/error.constant"),
    General: require("../constants/general.constant")
};

const Services = {
    Ticket: require("../services/ticket.service"),
    Env: require("../services/env.service"),
    Socket: require("../services/socket.service"),
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

async function getQueueByTutor(req, res, next) {
    const courses = req.body.account.tutor.courses;
    const courseIds = courses.map(c => {
        if (c instanceof mongoose.Types.ObjectId) {
            return c;
        } else if (c.id instanceof mongoose.Types.ObjectId) {
            return c.id;
        } else if (c._id instanceof mongoose.Types.ObjectId) {
            return c._id;
        } else {
            return null;
        }
    }).filter((cId) => cId !== null);
    const tickets = await Services.Ticket.getQueue(courseIds, req.body.account.id, req.body.expandTutor, req.body.expandStudent, req.body.expandCourse);
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
        },
        $push: {
            blacklist: req.body.ticket.tutorId
        }
    };
    const ticket = await Services.Ticket.updateOne(req.body.id, updatedValue);
    req.body.ticket = ticket;
    next();
}

async function getNewTicketFIFO(req, res, next) {
    const tutor = req.user.tutor;
    const ticket = await Services.Ticket.getNewTicketFIFO(tutor.courses, req.user.id);
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
    const ticket = await Services.Ticket.getNewTicketOptimized(tutor.courses, req.user.id);
    req.body.ticket = ticket;
    next();
}

async function assignTicket(req, res, next) {
    req.body.ticket = await Services.Ticket.updateOne(req.body.ticket.id, {
        tutorId: req.user.id
    });
    next();
}

async function getPositionInQueue(req, res, next) {
    const ticket = req.body.ticket;
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    const query = {
        createdAt: {
            $gte: midnight
        },
        courseId: {
            $eq: ticket.courseId
        },
        // not assigned
        tutorId: {
            $exists: false
        },
        // not ended
        endedAt: {
            $exists: false
        }
    };
    const tickets = (await Services.Ticket.find(query)).sort((t1, t2) => new Date(t1.createdAt).getTime() - new Date(t2.createdAt).getTime());
    const position = tickets.findIndex((maybeTicket) => maybeTicket.id === ticket.id) + 1;
    req.body.position = position;
    next();
}

/**
 * 
 * @param {number} queueUpdateValue by how much the queue has shifted. +1 if people move backwards, or -1 if people move forwards.
 */
function broadcastQueueUpdatedEvent(queueUpdateValue) {
    return (req, res, next) => {
        const eventName = "queue_update";
        const ticket = req.body.ticket;
        const courseId = ticket.courseId;
        Services.Socket.broadcast(courseId.toString(), eventName, {
            courseId,
            queueUpdateValue
        });
        next();
    };
}

function broadcastTicketUpdateEvent(eventType) {
    return Middleware.Util.asyncMiddleware(async (req, res, next) => {
        const eventName = "ticket_update";
        const ticket = req.body.ticket;
        const fullTicket = await Services.Ticket.findById(ticket.id, true, true);
        const tutorName = fullTicket.tutorId ? fullTicket.tutorId.firstName : "a tutor";
        const studentName = fullTicket.studentId ? `${fullTicket.studentId.firstName} ${fullTicket.studentId.lastName.substr(0, 1)}.` : "a student";
        const MESSAGES = {
            STUDENT: {
                assigned: `Your question was assigned to ${tutorName}. Make sure they can find you!`,
                started: `${tutorName} has started the session.`,
                ended: `Your question has been fulfilled. Still puzzled? Ask a new question!`,
                abandoned: `${tutorName} has put you back at the front of the queue.`,
                rated: `Thank you for rating this session!`,
                default: `Your question was ${eventType}`
            },
            TUTOR: {
                assigned: `You have been assigned to ${studentName}. Make sure they can find you!`,
                started: `You have started the session.`,
                ended: `Another one done.`,
                abandoned: `You yielded the question.`,
                rated: `Someone has rated your help.`,
                default: `Your student's question was ${eventType}`
            }
        };
        const data = {
            eventType,
            fullTicket
        };
        Services.Socket.broadcast(ticket.id, eventName, {
            ...data,
            message: `The question was ${eventType}`
        });
        if (ticket.studentId) {
            Services.Socket.broadcast(ticket.studentId, eventName, {
                ...data,
                message: MESSAGES.STUDENT[eventType] || MESSAGES.STUDENT.default
            });
        }
        if (ticket.tutorId) {
            Services.Socket.broadcast(ticket.tutorId, eventName, {
                ...data,
                message: MESSAGES.TUTOR[eventType] || MESSAGES.TUTOR.default
            });
        }
        next();
    });
}

module.exports = {
    broadcastQueueUpdatedEvent: broadcastQueueUpdatedEvent,
    broadcastTicketUpdateEvent: broadcastTicketUpdateEvent,

    getPositionInQueue: Middleware.Util.asyncMiddleware(getPositionInQueue),
    getByQuery: Middleware.Util.asyncMiddleware(getByQuery),
    createTicket: Middleware.Util.asyncMiddleware(createTicket),
    getById: Middleware.Util.asyncMiddleware(getById),
    getByUser: Middleware.Util.asyncMiddleware(getByUser),
    getQueueByTutor: Middleware.Util.asyncMiddleware(getQueueByTutor),
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