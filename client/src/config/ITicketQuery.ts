export interface ITicketQuery {
  createBefore?: Date;
  createAfter?: Date;
  started?: boolean;
  ended?: boolean;
  endBefore?: Date;
  endAfter?: Date;
  assigned?: boolean;
  tutorId?: string;
  studentId?: string;
  courseId?: string;
  expandTutor?: boolean;
  expandCourse?: boolean;
  expandStudent?: boolean;
}
