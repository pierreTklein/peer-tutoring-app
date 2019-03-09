import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIRoute, ITutor } from "../config";
import API from "./api";
import APIResponse from "./APIResponse";
import { ITicketQuery } from "../config/ITicketQuery";

class TicketAPI {
  constructor() {
    API.createEntity(APIRoute.TICKET);
    API.createEntity(APIRoute.TICKET_SELF);
    API.createEntity(APIRoute.TICKET_ASSIGN);
    API.createEntity(APIRoute.TICKET_START, ":id");
    API.createEntity(APIRoute.TICKET_END, ":id");
    API.createEntity(APIRoute.TICKET_RATE, ":id");
  }
  public patchSelf(tutor: ITutor) {
    return API.getEndpoint(APIRoute.TUTOR).patch({ id: "" }, tutor);
  }

  public patch(id: string, tutor: ITutor) {
    return API.getEndpoint(APIRoute.TUTOR).patch({ id }, tutor);
  }

  public start(id: string) {
    return API.getEndpoint(APIRoute.TICKET_START).patch({ id }, {});
  }
}
export const Ticket = new TicketAPI();
export default Ticket;
