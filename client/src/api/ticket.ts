import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIRoute, ITicket } from "../config";
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
    API.createEntity(APIRoute.TICKET_ABANDON, ":id");
  }
  public create(ticket: ITicket) {
    return API.getEndpoint(APIRoute.TICKET).create(ticket);
  }
  public getSelf(
    expandTutor?: boolean,
    expandCourse?: boolean,
    expandStudent?: boolean
  ) {
    return API.getEndpoint(APIRoute.TICKET_SELF).getAll({
      params: {
        expandTutor,
        expandCourse,
        expandStudent
      }
    });
  }

  public search(query: ITicketQuery) {
    return API.getEndpoint(APIRoute.TICKET).getAll({
      params: query
    });
  }

  public start(id: string) {
    return API.getEndpoint(APIRoute.TICKET_START).patch({ id }, {});
  }
  public end(id: string) {
    return API.getEndpoint(APIRoute.TICKET_END).patch({ id }, {});
  }
  public rate(id: string) {
    return API.getEndpoint(APIRoute.TICKET_RATE).patch({ id }, {});
  }
  public abandon(id: string) {
    return API.getEndpoint(APIRoute.TICKET_ABANDON).patch({ id }, {});
  }
  public assign() {
    return API.getEndpoint(APIRoute.TICKET_ASSIGN).patch({ id: "" }, {});
  }
}
export const Ticket = new TicketAPI();
export default Ticket;
