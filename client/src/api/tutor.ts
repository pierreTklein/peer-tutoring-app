import { AxiosPromise, AxiosRequestConfig } from "axios";
import { APIRoute, ITutor, ITicket } from "../config";
import API from "./api";
import APIResponse from "./APIResponse";
import LocalCache from "../util/LocalCache";

class TutorAPI {
  constructor() {
    API.createEntity(APIRoute.TUTOR);
    API.createEntity(APIRoute.TUTOR_QUEUE, ":id");
  }
  public async patchSelf(tutor: ITutor) {
    const r = await API.getEndpoint(APIRoute.TUTOR).patch({ id: "" }, tutor);
    LocalCache.removeAll();
    return r;
  }

  public async patch(id: string, tutor: ITutor) {
    const result = await API.getEndpoint(APIRoute.TUTOR).patch({ id }, tutor);
    LocalCache.removeAll();
    return result;
  }

  public getQueue(
    id: string
  ): AxiosPromise<APIResponse<{ tickets: ITicket[] }>> {
    return API.getEndpoint(APIRoute.TUTOR_QUEUE).getOne({ id });
  }
}
export const Tutor = new TutorAPI();
export default Tutor;
