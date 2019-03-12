import { UserType } from "./UserType";
import { ITutor } from "./ITutor";

export interface IAccount {
  id: string;
  _id?: string;
  pronoun: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: UserType[];
  tutor: ITutor;
}
