import openSocket from "socket.io-client";
import { ITicket } from "../config";
import { toast } from "react-toastify";

export interface TicketUpdateEvent {
  eventType: "assigned" | "started" | "ended" | "abandoned" | "rated";
  data: ITicket;
}

function notifyToast({ eventType }: TicketUpdateEvent) {
  toast.info(`Your question was ${eventType}!`, {
    toastId: "update"
  });
}

class SocketAPI {
  private socket = openSocket("/");
  private roomsJoined: { [key: string]: boolean } = {};
  constructor() {
    this.socket.on("update", notifyToast);
  }
  public joinRoom(room: string) {
    if (!this.roomsJoined[room]) {
      this.socket.emit("join", room);
      this.roomsJoined[room] = true;
    }
  }
  public leaveRoom(room: string) {
    if (!this.roomsJoined[room]) {
      this.socket.emit("leave", room);
      this.roomsJoined[room] = false;
    }
  }
  public addTicketUpdateEventListener(fn: (data: TicketUpdateEvent) => void) {
    this.socket.on("update", fn);
  }
}

export const SocketConn = new SocketAPI();
export default SocketConn;
