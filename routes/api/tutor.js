"use strict";
const express = require("express");

const Middleware = {
    Validator: {
        Account: require("../../middlewares/validators/account.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator"),
        Ticket: require("../../middlewares/validators/ticket.validator")
    },
    Util: require("../../middlewares/util.middleware"),
    Account: require("../../middlewares/account.middleware"),
    Auth: require("../../middlewares/auth.middleware"),
    Ticket: require("../../middlewares/ticket.middleware")
};
const Controllers = {
    Account: require("../../controllers/account.controller"),
    Ticket: require("../../controllers/ticket.controller")
};

const Constants = {
    General: require("../../constants/general.constant")
};


module.exports = {
    activate: function (apiRouter) {
        const tutorRouter = express.Router();
        //patch self tutor
        tutorRouter.route("/").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR]),
            Middleware.Validator.Account.updateTutorValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.parsePatch,
            Middleware.Util.putUserIdInBody,
            Middleware.Account.updateAccount,
            Controllers.Account.updatedAccount
        );

        //patch any tutor
        tutorRouter.route("/:id").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.STAFF]),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Validator.Account.updateTutorValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.parsePatch,
            Middleware.Account.updateAccount,
            Controllers.Account.updatedAccount
        );

        //get any tutor
        tutorRouter.route("/:id").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized(Constants.General.USER_TYPES),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.getById,
            Middleware.Account.failIfNotTutor,
            Controllers.Account.gotAccount
        );

        //get all tickets that are in the queue for a tutor.
        tutorRouter.route("/:id/queue").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized([Constants.General.TUTOR, Constants.General.STAFF]),
            Middleware.Validator.Ticket.TicketExpansionValidator,
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.getById,
            Middleware.Account.failIfNotTutor,
            Middleware.Ticket.getQueueByTutor,
            Controllers.Ticket.gotTickets
        );
        apiRouter.use("/tutor", tutorRouter);
    }
};