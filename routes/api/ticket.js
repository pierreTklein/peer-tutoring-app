"use strict";
const express = require("express");
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
            Middleware.Validator.Ticket.SearchTicketValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getByQuery,
            Controllers.Ticket.gotTickets
        );

        //make new ticket
        ticketRouter.route("/").post(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.Ticket.PostTicketValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Util.parseByModel("ticketDetails", Model.Ticket),
            Middleware.Ticket.failIfUserHasOpenTicket,
            Middleware.Ticket.createTicket,
            Controllers.Ticket.createdTicket
        );

        //get all tickets associated with current user.
        ticketRouter.route("/mine").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Ticket.getByUser,
            Controllers.Ticket.gotTickets
        );
        
        //assign new ticket to tutor.
        ticketRouter.route("/assign").patch(
            Middleware.Auth.ensureAuthenticated(),
            // TODO
        );
    
        //get specific ticket
        ticketRouter.route("/:id").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Controllers.Ticket.gotTicket
        );

        //start a ticket
        ticketRouter.route("/:id/start").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.startTicket,
            Controllers.Ticket.startedTicket            
        );
        
        //end a ticket
        ticketRouter.route("/:id/end").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.endTicket,
            Controllers.Ticket.endedTicket
        );

        //add rating
        ticketRouter.route("/:id/rate").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.Ticket.rateValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Ticket.getById,
            Middleware.Ticket.rateTicket,
            Controllers.Ticket.ratedTicket
        );
        
        apiRouter.use("/ticket", ticketRouter);
    }
};