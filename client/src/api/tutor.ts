import { AxiosPromise, AxiosRequestConfig } from "axios";
import { APIRoute, ITutor, ITicket } from "../config";
import API from "./api";
import APIResponse from "./APIResponse";

class TutorAPI {
  constructor() {
    API.createEntity(APIRoute.TUTOR);
    API.createEntity(APIRoute.TUTOR_QUEUE, ":id");
  }
  public patchSelf(tutor: ITutor) {
    return API.getEndpoint(APIRoute.TUTOR).patch({ id: "" }, tutor);
  }

  public patch(id: string, tutor: ITutor) {
    return API.getEndpoint(APIRoute.TUTOR).patch({ id }, tutor);
  }

  public getQueue(
    id: string
  ): AxiosPromise<APIResponse<{ tickets: ITicket[] }>> {
    return API.getEndpoint(APIRoute.TUTOR_QUEUE).getOne({ id });
  }
}
export const Tutor = new TutorAPI();
export default Tutor;
