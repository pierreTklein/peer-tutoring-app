import openSocket from "socket.io-client";
import { ITicket, URL } from "../config";

export enum EventType {
  ASSIGNED = "Question Assigned",
  STARTED = "Question Started",
  ENDED = "Question Ended",
  ABANDONED = "Question Yielded",
  RATED = "Question Rated"
}

export interface ITicketUpdateEvent {
  eventType: EventType;
  message: string;
  data: ITicket;
}
export interface IQueueUpdateEvent {
  courseId: string;
  updateValue: number;
}

class SocketAPI {
  private socket: SocketIOClient.Socket;
  private roomsJoined: { [key: string]: boolean } = {};
  constructor() {
    const uri = URL;
    this.socket = openSocket(uri);
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
  public addTicketUpdateEventListener(fn: (data: ITicketUpdateEvent) => void) {
    this.socket.on("ticket_update", fn);
  }
  public removeTicketUpdateEventListener(
    fn: (data: ITicketUpdateEvent) => void
  ) {
    this.socket.removeEventListener("ticket_update", fn);
  }
  public addQueueUpdateEventListener(fn: (data: IQueueUpdateEvent) => void) {
    this.socket.on("queue_update", fn);
  }
  public removeQueueUpdateEventListener(
    fn: (updateVal: IQueueUpdateEvent) => void
  ) {
    this.socket.removeEventListener("queue_update", fn);
  }
}

export const SocketConn = new SocketAPI();
export default SocketConn;
