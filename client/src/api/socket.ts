import openSocket from "socket.io-client";
const socket = openSocket(location.origin);

function joinRoom(room: string) {
  socket.emit("join", room);
  socket.on("update", (data: any) => {
    console.log(data);
  });
}
export { joinRoom };
