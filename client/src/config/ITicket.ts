import { IAccount } from "./IAccount";
import { ICourse } from "./ICourse";

export interface ITicket {
  tutorId?: string | IAccount;
  studentId: string | IAccount;
  courseId: string | ICourse;
  question: string;
  category?: string;
  createdAt?: string;
  startedAt?: string;
  endedAt?: string;
  rating?: number;
  id?: string;
  _id?: string;
}

export function parseCourse(course: string | ICourse) {
  if (typeof course === "string") {
    return `course ID ${course}`;
  } else {
    return `${course.dept} ${course.code}`;
  }
}

export function parseTutor(tutor: string | IAccount | undefined) {
  if (!tutor) {
    return "Pending...";
  } else if (typeof tutor === "string") {
    return `${tutor}`;
  } else {
    return `${tutor.firstName} ${tutor.lastName}`;
  }
}

export function parseStudent(student: string | IAccount) {
  if (typeof student === "string") {
    return `${student}`;
  } else {
    return `${student.firstName} ${student.lastName.substr(0, 1)}.`;
  }
}

/**
 * Compare by:
 * - End date, earliest to latest. If only one has this date, then that is placed first.
 * - Start date, earliest to latest. If only one has this date, then that is placed first.
 * - Create date, earliest to latest.
 * @param t1 first ticket
 * @param t2 second ticket
 */
export function compareTicket(t1: ITicket, t2: ITicket): number {
  if (t1.endedAt && t2.endedAt) {
    return new Date(t2.endedAt).getTime() - new Date(t1.endedAt).getTime();
  } else if (t1.endedAt || t2.endedAt) {
    return t1.endedAt ? -1 : 1;
  } else if (t1.startedAt && t2.startedAt) {
    return new Date(t2.startedAt).getTime() - new Date(t1.startedAt).getTime();
  } else if (t1.startedAt || t2.startedAt) {
    return t1.startedAt ? -1 : 1;
  } else if (t1.createdAt && t2.createdAt) {
    return new Date(t2.createdAt).getTime() - new Date(t1.createdAt).getTime();
  } else {
    return t1.createdAt ? -1 : 1;
  }
}
