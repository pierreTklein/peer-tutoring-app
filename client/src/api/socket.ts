import openSocket from "socket.io-client";
import {
  ITicket,
  UserType,
  IS_LOCALHOST,
  LOCAL_URL,
  PROD_URL
} from "../config";
import { toast } from "react-toastify";
import { playNotification } from "../util/audio";

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

function notifyToast({ eventType, message }: ITicketUpdateEvent) {
  let toastFn;
  switch (eventType) {
    case EventType.STARTED:
      toastFn = toast.warn;
      break;
    case EventType.ABANDONED:
      toastFn = toast.error;
      break;
    case EventType.ENDED:
      toastFn = toast.success;
      break;
    default:
      toastFn = toast.info;
  }
  playNotification();
  toastFn(message || "", {
    toastId: "update",
    autoClose: 10000
  });
}

const uri = IS_LOCALHOST ? LOCAL_URL : PROD_URL;

class SocketAPI {
  private socket = openSocket(uri);
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
