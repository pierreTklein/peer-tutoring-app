"use strict";
const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    question: String,
    startedAt: Date,
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
