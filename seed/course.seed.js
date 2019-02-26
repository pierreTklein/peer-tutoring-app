"use strict";
var fs = require("fs");
const path = require("path");

const Course = require("../models/course.model");

/**
 * Drops all elements in Courses
 */
function dropAll() {
    return Course.deleteMany({});
}

function readCourses() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "./courses.json"), "utf8"));
}

/**
 * Stores all of the Courses in the db
 * @param {Course[]} attributes all attributes
 */
function storeAll(attributes) {
    const roleDocs = [];
    const roleNames = [];
    attributes.forEach((attribute) => {
        roleDocs.push(new Course(attribute));
        roleNames.push(attribute.name);
    });
    return Course.collection.insertMany(roleDocs);
}

module.exports = {
    storeAll: storeAll,
    dropAll: dropAll,
    readCourses: readCourses
};