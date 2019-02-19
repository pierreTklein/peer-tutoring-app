"use strict";
const LocalStrategy = require("passport-local").Strategy;
const Account = require("../services/account.service");
const logger = require("./logger.service");

module.exports = {
    emailAndPassStrategy: new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, function (email, password, done) {
        email = email.toLowerCase();
        Account.getAccountIfValid(email, password).then(
            (account) => {
                if (!!account) {
                    done(null, account);
                } else {
                    done(null, false);
                }
            },
            (reason) => {
                done(reason, false);
            }
        );
    }),
    /**
     * Takes as input the id of the user. If the user id exists, it passes the user object to the callback 
     * (done). The two arguments of the callback must be (failureReason, userObject). If there is no user,
     * then the userObject will be undefined.
     */
    deserializeUser: function (id, done) {
        Account.findById(id).then(
            (user) => {
                done(null, user);
            },
            (reason) => {
                done(reason);
            }
        );
    },
    serializeUser: function (user, done) {
        done(null, user.id);
    },
};