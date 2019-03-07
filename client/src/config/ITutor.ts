import { ICourse } from "./ICourse";

export interface ITutor {
    courses: string[] | ICourse[],
    isOnDuty: boolean;
}