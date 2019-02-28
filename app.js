"use strict";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const Services = {
    log: require("./services/logger.service"),
    db: require("./services/database.service"),
    auth: require("./services/auth.service"),
    env: require("./services/env.service")
};

const envLoadResult = Services.env.load(path.join(__dirname, "./.env"));
if (envLoadResult.error) {
    Services.log.error(envLoadResult.error);
}

const passport = require("passport");
passport.use("emailAndPass", Services.auth.emailAndPassStrategy);

/* Routes here */
const indexRouter = require("./routes/api/index");
const accountRouter = require("./routes/api/account");
const authRouter = require("./routes/api/auth");
const courseRouter = require("./routes/api/course");
const ticketRouter = require("./routes/api/ticket");
const tutorRouter = require("./routes/api/tutor");

const app = express();
Services.db.connect(app);

app.use(cors({
    origin: [Services.env.frontendAddress()],
    credentials: true
}));
app.use(Services.log.requestLogger);
app.use(Services.log.errorLogger);
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
//Cookie-based session tracking
app.use(cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    // Cookie Options
    maxAge: 48 * 60 * 60 * 1000 //Logged in for 48 hours
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login session

app.use(express.static(path.join(__dirname, "client/build")));

var apiRouter = express.Router();

accountRouter.activate(apiRouter);
Services.log.info("Account router activated");
authRouter.activate(apiRouter);
Services.log.info("Auth router activated");
courseRouter.activate(apiRouter);
Services.log.info("Course router activated");
ticketRouter.activate(apiRouter);
Services.log.info("Ticket router activated");
tutorRouter.activate(apiRouter);
Services.log.info("Ticket router activated");

apiRouter.use("/", indexRouter);

app.use("/api", apiRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//Custom error handler
app.use((err, req, res, next) => {
    // log the error...
    const status = (err.status) ? err.status : 500;
    const message = (err.message) ? err.message : "Internal Server Error";
    //Only show bad error when we're not in production
    let errorContents;
    if (status === 500 && Services.env.isProduction) {
        errorContents = {};
    } else if (err.error) {
        errorContents = err.error;
    } else if (err.data) {
        errorContents = err.data;
    } else {
        errorContents = err;
    }
    res.status(status).json({
        message: message,
        data: errorContents
    });
});

module.exports = {
    app: app,
};