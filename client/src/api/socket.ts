import openSocket from "socket.io-client";
import { ITicket, IS_LOCALHOST, LOCAL_URL, PROD_URL } from "../config";

export enum EventType {
  ASSIGNED = "assigned",
  STARTED = "started",
  ENDED = "ended",
  ABANDONED = "abandoned",
  RATED = "rated"
}

export interface ITicketUpdateEvent {
  eventType: EventType;
  message: string;
  data: ITicket;
}

class SocketAPI {
  private socket: SocketIOClient.Socket;
  private roomsJoined: { [key: string]: boolean } = {};
  constructor() {
    const uri = IS_LOCALHOST ? LOCAL_URL : PROD_URL;
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
    this.socket.on("update", fn);
  }
  public removeTicketUpdateEventListener(
    fn: (data: ITicketUpdateEvent) => void
  ) {
    this.socket.removeEventListener("update", fn);
  }
}

export const SocketConn = new SocketAPI();
export default SocketConn;
