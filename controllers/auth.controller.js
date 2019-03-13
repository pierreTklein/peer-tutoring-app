"use strict";

const Success = require("../constants/success.constant");

module.exports = {
    onSuccessfulLogin: function (req, res) {
        return res.status(200).json({
            message: Success.LOGIN,
            data: req.body.account.toStrippedJSON()
        });
    },
    logout: function (req, res) {
        const user = req.user;

        req.logout();
        return res.status(200).json({
            message: Success.LOGOUT,
            data: user.toStrippedJSON()
        });
    },
    sentResetEmail: function (req, res) {
        return res.status(200).json({
            message: Success.AUTH_SEND_RESET_EMAIL,
            data: {}
        });
    },
    resetPassword: function (req, res) {
        return res.status(200).json({
            message: Success.AUTH_RESET_PASSWORD,
            data: {}
        });
    },
    confirmAccount: function (req, res) {
        return res.status(200).json({
            message: Success.AUTH_CONFIRM_ACCOUNT,
            data: {}
        });
    },
};