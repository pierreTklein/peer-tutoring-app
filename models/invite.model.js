"use strict";
const mongoose = require("mongoose");
const Constants = {
    General: require("../constants/general.constant"),
};

const inviteSchema = new mongoose.Schema({
    accountType: [{
        type: String,
        enum: Constants.General.USER_TYPES,
        default: Constants.General.STUDENT
    }],
    email: {
        type: String,
        required: true
    }
});

inviteSchema.methods.toJSON = function () {
    const o = this.toObject();
    delete o.__v;
    o.id = o._id;
    delete o._id;
    return o;
};

module.exports = mongoose.model("Invite", inviteSchema);