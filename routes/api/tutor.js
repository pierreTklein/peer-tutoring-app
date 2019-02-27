"use strict";
const express = require("express");

const Middleware = {
    Validator: {
        Account: require("../../middlewares/validators/account.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator")
    },
    Util: require("../../middlewares/util.middleware"),
    Account: require("../../middlewares/account.middleware"),
    Auth: require("../../middlewares/auth.middleware")
};
const Controllers = {
    Account: require("../../controllers/account.controller")
};

module.exports = {
    activate: function (apiRouter) {
        const tutorRouter = express.Router();
        //patch tutor
        tutorRouter.route("/").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized(["Tutor"]),
            Middleware.Validator.Account.updateTutorValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.parsePatch,
            Middleware.Util.putUserIdInBody,
            Middleware.Account.updateAccount,
            Controllers.Account.updatedAccount
        );

        //patch tutor
        tutorRouter.route("/:id").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized(["Staff"]),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Validator.Account.updateTutorValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.parsePatch,
            Middleware.Account.updateAccount,
            Controllers.Account.updatedAccount
        );

        apiRouter.use("/tutor", tutorRouter);
    }
};