"use strict";

const Success = require("../constants/success.constant");

/**
 * Retrieved multiple Courses.
 * @param {*} req 
 * @param {*} res 
 */
function gotCourses(req, res) {
    res.status(200).json({
        message: Success.COURSE_READ,
        data: {
            courses: req.body.courses
        }
    });
}

/**
 * Retrieved single Course.
 * @param {*} req 
 * @param {*} res 
 */
function gotCourse(req, res) {
    res.status(200).json({
        message: Success.COURSE_READ,
        data: {
            course: req.body.course
        }
    });
}

/**
 * Created single Course.
 * @param {*} req 
 * @param {*} res 
 */
function createdCourse(req, res) {
    res.status(200).json({
        message: Success.COURSE_CREATE,
        data: {
            course: req.body.course
        }
    });
}

module.exports = {
    gotCourse: gotCourse, 
    gotCourses: gotCourses,
    createdCourse: createdCourse,
};