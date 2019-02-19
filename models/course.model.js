"use strict";
const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    dept: String,
    code: Number,
    name: String
});
CourseSchema.methods.toJSON = function () {
    const o = this.toObject();
    delete o.__v;
    o.id = o._id;
    delete o._id;
    return o;
};
module.exports = mongoose.model("Course", CourseSchema);
