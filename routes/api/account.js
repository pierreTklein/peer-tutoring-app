"use strict";

const express = require("express");
const Controllers = {
    Account: require("../../controllers/account.controller")
};
const Middleware = {
    Validator: {
        /* Insert the require statement to the validator file here */
        Account: require("../../middlewares/validators/account.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator"),
        Auth: require("../../middlewares/validators/auth.validator")
    },
    /* Insert all of ther middleware require statements here */
    Util: require("../../middlewares/util.middleware"),
    Account: require("../../middlewares/account.middleware"),
    Auth: require("../../middlewares/auth.middleware")
};

module.exports = {
    activate: function (apiRouter) {
        const accountRouter = express.Router();

        accountRouter.route("/").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Account.getByEmail,
            Controllers.Account.showAccount
        );
        accountRouter.route("/").post(
            Middleware.Validator.Account.newAccountValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.parseAccount,
            Middleware.Account.failIfExists,
            Middleware.Account.addAccount,
            Controllers.Account.addedAccount
        );

        accountRouter.route("/invite").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Util.failIfNotValid,
            Middleware.Account.getInvites,
            Controllers.Account.gotInvites
        );

        accountRouter.route("/invite").post(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.Account.inviteAccountValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.inviteAccount,
            Controllers.Account.invitedAccount
        );

        accountRouter.route("/:id").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Validator.Account.updateAccountValidator,

            Middleware.Util.failIfNotValid,
            Middleware.Account.parsePatch,
            Middleware.Account.updateAccount,
            Controllers.Account.updatedAccount
        );

        accountRouter.route("/:id").get(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Validator.RouteParam.idValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Account.getById,
            Controllers.Account.showAccount
        );

        apiRouter.use("/account", accountRouter);
    }
};