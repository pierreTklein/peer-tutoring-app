"use strict";
const express = require("express");

const Constants = {
    General: require("../../constants/general.constant")
};

const Model = {
    Ticket: require("../../models/ticket.model")
};

const Middleware = {
    Validator: {
        Ticket: require("../../middlewares/validators/ticket.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator")
    },
    Util: require("../../middlewares/util.middleware"),
    Auth: require("../../middlewares/auth.middleware"),
    Ticket: require("../../middlewares/ticket.middleware")
};
const Controllers = {
    Ticket: require("../../controllers/ticket.controller")
};

module.exports = {
    activate: function (apiRouter) {
        const ticketRouter = express.Router();
        //get all tickets according to query
        ticketRouter.route("/").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.STAFF]),
            Middleware.Validator.Ticket.TicketExpansionValidator,
            Middleware.Validator.Ticket.SearchTicketValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getByQuery,
            Controllers.Ticket.gotTickets
        );

        //make new ticket
        ticketRouter.route("/").post(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.STUDENT]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Validator.Ticket.PostTicketValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Util.parseByModel("ticketDetails", Model.Ticket),
            Middleware.Ticket.failIfUserHasOpenTicket,
            Middleware.Ticket.createTicket,
            Middleware.Ticket.broadcastQueueUpdatedEvent(0),
            Controllers.Ticket.createdTicket
        );

        //get all tickets associated with current user.
        ticketRouter.route("/me").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR, Constants.General.STUDENT]),
            Middleware.Validator.Ticket.TicketExpansionValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getByUser,
            Controllers.Ticket.gotTickets
        );

        //assign new ticket to tutor.
        ticketRouter.route("/assign").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Ticket.getNewTicketFIFO,
            Middleware.Ticket.assignTicket,
            Middleware.Ticket.broadcastQueueUpdatedEvent(-1),
            Middleware.Ticket.broadcastTicketUpdateEvent("assigned"),
            Controllers.Ticket.assignedTicket,
        );

        //get specific ticket
        ticketRouter.route("/:id").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.STAFF, Constants.General.TUTOR]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Controllers.Ticket.gotTicket
        );
        //end a ticket
        ticketRouter.route("/:id/position").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.STUDENT, Constants.General.TUTOR, Constants.General.STAFF]),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.failIfStarted,
            Middleware.Ticket.getPositionInQueue,
            Controllers.Ticket.gotTicketPosition
        );
        //assign a ticket
        ticketRouter.route("/:id/assign").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Ticket.getById,
            Middleware.Ticket.failIfAssigned,
            Middleware.Ticket.assignTicket,
            Middleware.Ticket.broadcastQueueUpdatedEvent(-1),
            Middleware.Ticket.broadcastTicketUpdateEvent("assigned"),
            Controllers.Ticket.assignedTicket,
        );

        //start a ticket
        ticketRouter.route("/:id/start").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR, Constants.General.STAFF]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.failIfNotAssigned,
            Middleware.Ticket.failIfStarted,
            Middleware.Ticket.startTicket,
            Middleware.Ticket.broadcastTicketUpdateEvent("started"),
            Controllers.Ticket.startedTicket
        );

        //end a ticket
        ticketRouter.route("/:id/end").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR, Constants.General.STAFF, Constants.General.STUDENT]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.failIfEnded,
            Middleware.Ticket.endTicket,
            Middleware.Ticket.broadcastTicketUpdateEvent("ended"),
            Controllers.Ticket.endedTicket
        );

        //end a ticket
        ticketRouter.route("/:id/abandon").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.failIfNotAssigned,
            Middleware.Ticket.failIfEnded,
            Middleware.Ticket.broadcastQueueUpdatedEvent(1),
            Middleware.Ticket.broadcastTicketUpdateEvent("abandoned"),
            Middleware.Ticket.abandonTicket,
            Controllers.Ticket.abandonedTicket
        );

        //add rating
        ticketRouter.route("/:id/rate").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.STAFF, Constants.General.STUDENT]),
            Middleware.Auth.ensureConfirmed,
            Middleware.Validator.Ticket.rateValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.rateTicket,
            Middleware.Ticket.broadcastTicketUpdateEvent("rated"),
            Controllers.Ticket.ratedTicket
        );

        apiRouter.use("/ticket", ticketRouter);
    }
};