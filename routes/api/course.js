"use strict";
const express = require("express");
const Services = {
    Course: require("../../services/course.service"),
};
const Middleware = {
    Validator: {
        Course: require("../../middlewares/validators/course.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator")
    },
    Util: require("../../middlewares/util.middleware"),
    Course: require("../../middlewares/course.middleware")
};
const Controllers = {
    Course: require("../../controllers/course.controller")
};

module.exports = {
    activate: function (apiRouter) {
        const courseRouter = express.Router();
        //get all courses
        courseRouter.route("/").get(
            
        );
    
        //make new course
        courseRouter.route("/").post(
        );

        //get specific ticket
        courseRouter.route("/:id").get(
            Middleware.Validator.RouteParam.idValidator,
        );

        apiRouter.use("/course", courseRouter);
    }
};