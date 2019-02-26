"use strict";

const Constants = {
    Error: require("../constants/error.constant")
};

const Services = {
    Course: require("../services/course.service"),
    Env: require("../services/env.service")
};

const Middleware = {
    Util: require("./util.middleware")
};
async function getByQuery(req, res, next) {
    const courses = await Services.Course.find({});
    req.body.courses = courses;
    next();
}

async function getById(req, res, next) {
    const course = await Services.Course.findById(req.body.id);
    if (!course) {
        return next({
            status: 404,
            message: Constants.Error.COURSE_404_MESSAGE
        });
    }
    req.body.course = course;
    next();
}

async function createTicket(req, res, next) {
    const course = await Services.Ticket.addOne(req.body.courseDetails);
    req.body.course = course;
    next();
}

module.exports = {
    createTicket: Middleware.Util.asyncMiddleware(createTicket),
    getByQuery: Middleware.Util.asyncMiddleware(getByQuery),
    getById: Middleware.Util.asyncMiddleware(getById),
};
