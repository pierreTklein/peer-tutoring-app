"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Constants = require("../constants/general.constant");
//describes the data type
const AccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    pronoun: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        match: [Constants.EMAIL_REGEX, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true
    },

    accountType: [{
        type: String,
        enum: Constants.USER_TYPES,
        default: Constants.STUDENT
    }],

    // Tutor information if the user is a tutor.
    tutor: {
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }],
        isOnDuty: Boolean
    },
});

AccountSchema.methods.toJSON = function () {
    const o = this.toObject();
    delete o.__v;
    o.id = o._id;
    delete o._id;
    return o;
};
//deletes password
AccountSchema.methods.toStrippedJSON = function () {
    const as = this.toJSON();
    delete as.password;
    return as;
};
/**
 * Pass in an un-encrypted password and see whether it matches the 
 * encrypted password
 * @param {String} password 
 */
AccountSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//export the model
module.exports = mongoose.model("Account", AccountSchema);