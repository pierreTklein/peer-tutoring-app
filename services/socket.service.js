"use strict";
const io = require("socket.io")();
const Logger = require("./logger.service");
/**
 * Broadcast to room
 * @param {string} roomName 
 */
function broadcast(roomName, event, data) {
    Logger.info(`Broadcasting in ${roomName}: ${event}`);
    const roomNS = io.in(roomName);
    roomNS.emit(event, data);
}
module.exports = {
    activate: function (http) {
        io.attach(http);
        io.sockets.on("connection", function (socket) {
            socket.on("join", function (room) {
                socket.join(room);
            });
        });
    },
    broadcast: broadcast,
    io: io,
};