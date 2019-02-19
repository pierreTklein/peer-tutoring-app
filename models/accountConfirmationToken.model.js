"use strict";
const mongoose = require("mongoose");
const Constants = {
    General: require("../constants/general.constant"),
};

const AccountConfirmationSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: false
    },
    accountType: {
        type: String,
        enum: Constants.General.USER_TYPES,
        default: Constants.General.STUDENT
    },
    email: {
        type: String,
        required: true
    }
});

AccountConfirmationSchema.methods.toJSON = function () {
    const o = this.toObject();
    delete o.__v;
    o.id = o._id;
    delete o._id;
    return o;
};

module.exports = mongoose.model("AccountConfirmationToken", AccountConfirmationSchema);