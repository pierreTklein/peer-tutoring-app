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

        apiRouter.use("/tutor", tutorRouter);
    }
};