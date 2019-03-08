import { IAccount } from "./IAccount";
import { ICourse } from "./ICourse";

export interface ITicket {
  tutorId?: string | IAccount;
  studentId: string | IAccount;
  courseId: string | ICourse;
  question: string;
  createdAt?: string;
  startedAt?: string;
  endedAt?: string;
  rating?: number;
}
