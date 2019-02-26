"use strict";
const Course = require("../models/course.model");
const logger = require("./logger.service");

/**
 * @function findById
 * @param {ObjectId} id
 * @return {DocumentQuery} The document query will resolve to either account or null.
 * @description Finds a Course by mongoID.
 */
function findById(id) {
    const TAG = `[Course Service # findById]:`;
    const query = {
        _id: id
    };

    return Course.findById(query, logger.queryCallbackFactory(TAG, "Course", query));
}

/**
 * @function findOne
 * @param {*} query
 * @return {DocumentQuery} The document query will resolve to either Course or null.
 * @description Finds an Course by some query.
 */
function findOne(query) {
    const TAG = `[Course Service # findOne ]:`;

    return Course.findOne(query, logger.queryCallbackFactory(TAG, "Course", query));
}

/**
 * @function find
 * @param {*} query
 * @return {DocumentQuery[]} The document query will resolve to either Course[] or null.
 * @description Finds an Course by some query.
 */
function find(query) {
    const TAG = `[Course Service # find ]:`;

    return Course.find(query, logger.queryCallbackFactory(TAG, "Course", query));
}

/**
 * @function addOne
 * @param {Course} CourseDetails
 * @return {Promise<Account>} The promise will resolve to the account object if save is successful.
 * @description Adds a new account to database.
 */
function addOne(CourseDetails) {
    const course = new Course(CourseDetails);
    return course.save();
}

/**
 * @function updateOne
 * @param {ObjectId} id
 * @param {Course} CourseDetails 
 * @return {DocumentQuery} The document query will resolve to either Course or null.
 * @description Changes account information to the specified information in CourseDetails.
 */
function updateOne(id, CourseDetails) {
    const TAG = `[Course Service # updateOne ]:`;

    const query = {
        _id: id
    };

    return Course.findOneAndUpdate(query, CourseDetails, logger.updateCallbackFactory(TAG, "Course"));
}


module.exports = {
    find: find,
    addOne: addOne,
    findOne: findOne,
    findById: findById,
    updateOne: updateOne,
};