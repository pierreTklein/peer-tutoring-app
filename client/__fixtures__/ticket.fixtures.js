// eslint-disable-next-line strict
"use strict";

import {
  Ticket
} from "../src/Ticket/Ticket";
import withThemeProvider from "../src/shared/HOC/withThemeProvider";

export default {
  component: withThemeProvider(Ticket),
  props: {
    ticket: {
      courseId: {
        _id: "5ba6e1d844e481ec1ce9c9f6",
        dept: "COMP",
        code: 202,
        name: "Foundations of Programming"
      },
      question: "This is truly confusing me.",
      studentId: {
        _id: "5c81f0198162dc642056f079",
        firstName: "Student Tutor",
        lastName: "Blah"
      },
      createdAt: "2019-03-08T04:35:48.235Z",
      tutorId: {
        tutor: {
          courses: ["5ba6e1d844e481ec1ce9c9f6", "5ba6e1d844e481ec1ce9c9f7"]
        },
        _id: "5c81f0198162dc642056f077",
        firstName: "Tutor",
        lastName: "Blah"
      },
      id: "5c81f124625045673addcb8e"
    }
  }
};