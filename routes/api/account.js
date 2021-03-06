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

const Constants = {
  General: require("../../constants/general.constant")
};

module.exports = {
  activate: function (apiRouter) {
    const accountRouter = express.Router();

    accountRouter
      .route("/")
      .get(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Auth.ensureAuthenticated([Constants.General.STAFF]),
        Middleware.Validator.Account.searchAccountValidator,
        Middleware.Validator.Account.accountExpansionValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Account.getByQuery,
        Controllers.Account.gotAccounts
      );
    accountRouter
      .route("/")
      .post(
        Middleware.Validator.Account.newAccountValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Account.verifyInviteTokenIfExists,
        Middleware.Account.getInviteFromTokenIfExists,
        Middleware.Account.setAccountType,
        Middleware.Account.parseAccount,
        Middleware.Account.failIfExists,
        Middleware.Account.addAccount,
        Middleware.Account.sendConfirmationEmailIfNotInvited,
        Controllers.Account.addedAccount
      );

    accountRouter
      .route("/")
      .patch(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Validator.Account.updateAccountValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Account.parsePatch,
        Middleware.Util.putUserIdInBody,
        Middleware.Account.updateAccount,
        Controllers.Account.updatedAccount
      );

    accountRouter
      .route("/self")
      .get(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Validator.Account.accountExpansionValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Util.putUserIdInBody,
        Middleware.Account.getById,
        Controllers.Account.gotAccount
      );

    accountRouter
      .route("/confirm")
      .patch(
        Middleware.Validator.Account.confirmAccountValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Account.verifyConfirmationToken,
        Middleware.Account.getAccountFromConfirmationToken,
        Middleware.Account.confirmAccount,
        Controllers.Account.confirmedAccount
      );

    accountRouter
      .route("/confirm/resend")
      .post(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Auth.ensureNotConfirmed,
        Middleware.Util.putUserIdInBody,
        Middleware.Account.getById,
        Middleware.Account.sendConfirmationEmail,
        Controllers.Account.sentConfirmationEmail
      );

    accountRouter
      .route("/invite")
      .get(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Auth.ensureAuthorized([Constants.General.STAFF]),
        Middleware.Account.getInvites,
        Controllers.Account.gotInvites
      );

    accountRouter
      .route("/invite")
      .post(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Auth.ensureAuthorized([Constants.General.STAFF]),
        Middleware.Validator.Account.inviteAccountValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Account.failIfEmailExists,
        Middleware.Account.inviteAccount,
        Controllers.Account.invitedAccount
      );

    accountRouter.route("/:id").patch(
      Middleware.Auth.ensureAuthenticated(),
      Middleware.Auth.ensureAuthorized([Constants.General.STAFF]),
      Middleware.Validator.RouteParam.idValidator,
      Middleware.Validator.Account.updateAccountValidator,

      Middleware.Util.failIfNotValid,
      Middleware.Account.parsePatch,
      Middleware.Account.updateAccount,
      Controllers.Account.updatedAccount
    );

    accountRouter
      .route("/:id")
      .get(
        Middleware.Auth.ensureAuthenticated(),
        Middleware.Auth.ensureAuthorized([Constants.General.STAFF]),
        Middleware.Validator.Account.accountExpansionValidator,
        Middleware.Validator.RouteParam.idValidator,
        Middleware.Util.failIfNotValid,
        Middleware.Account.getById,
        Controllers.Account.gotAccount
      );

    apiRouter.use("/account", accountRouter);
  }
};