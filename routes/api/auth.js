"use strict";
const express = require("express");
const passport = require("passport");
const Services = {
    Account: require("../../services/account.service"),
    Auth: require("../../services/auth.service"),
    ResetPasswordToken: require("../../services/resetPassword.service")
};
const Middleware = {
    Validator: {
        Auth: require("../../middlewares/validators/auth.validator"),
    },
    Util: require("../../middlewares/util.middleware"),
    Auth: require("../../middlewares/auth.middleware"),
    Account: require("../../middlewares/account.middleware")
};
const Controllers = {
    Auth: require("../../controllers/auth.controller")
};

module.exports = {
    activate: function (apiRouter) {
        passport.serializeUser(Services.Auth.serializeUser);
        passport.deserializeUser(Services.Auth.deserializeUser);
        const authRouter = express.Router();

        authRouter.route("/login").post(
            Middleware.Auth.login,
            Controllers.Auth.onSuccessfulLogin
        );

        authRouter.route("/logout").get(
            Controllers.Auth.logout
        );

        authRouter.route("/password/forgot").post(
            Middleware.Validator.Auth.ForgotPasswordValidator,
            Middleware.Util.failIfNotValid,
            //create resetPassword jwt
            //send user an email to reset the password
            //create new entity in reset model
            //create reset token with entity id
            //send email to reset password route
            Middleware.Auth.sendResetPasswordEmailMiddleware,
            Controllers.Auth.sentResetEmail
        );

        authRouter.route("/password/change").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized(),
            Middleware.Validator.Auth.ChangePasswordValidator,
            Middleware.Util.failIfNotValid,

            Middleware.Auth.changePassword,
            Controllers.Auth.resetPassword
        );

        authRouter.route("/password/reset").post(
            //post new password, validate token also
            Middleware.Validator.Auth.ResetPasswordValidator,
            Middleware.Util.failIfNotValid,
            Middleware.Auth.parseResetToken,
            Middleware.Auth.validateResetToken,
            Middleware.Account.updatePassword,
            Middleware.Auth.deleteResetToken,
            Controllers.Auth.resetPassword
        );
        apiRouter.use("/auth", authRouter);
    }
};