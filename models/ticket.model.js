"use strict";
const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    blacklist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    }],
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    question: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    assignedAt: {
        type: Date,
    },
    startedAt: {
        type: Date,
    },
    endedAt: Date,
    rating: Number
});
TicketSchema.methods.toJSON = function () {
    const ticket = this.toObject();
    delete ticket.__v;
    ticket.id = ticket._id;
    delete ticket._id;
    return ticket;
};
module.exports = mongoose.model("Ticket", TicketSchema);