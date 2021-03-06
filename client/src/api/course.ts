import { APIRoute } from "../config";
import API from "./api";

class CourseAPI {
  constructor() {
    API.createEntity(APIRoute.COURSE);
  }
  public getAll() {
    return API.getEndpoint(APIRoute.COURSE).getAll();
  }
}
export const Course = new CourseAPI();
export default Course;
