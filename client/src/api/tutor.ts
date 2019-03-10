import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIRoute, ITutor, ITicket } from "../config";
import API from "./api";

class TutorAPI {
  constructor() {
    API.createEntity(APIRoute.TUTOR);
  }
  public patchSelf(tutor: ITutor) {
    return API.getEndpoint(APIRoute.TUTOR).patch({ id: "" }, tutor);
  }

  public patch(id: string, tutor: ITutor) {
    return API.getEndpoint(APIRoute.TUTOR).patch({ id }, tutor);
  }
}
export const Tutor = new TutorAPI();
export default Tutor;
