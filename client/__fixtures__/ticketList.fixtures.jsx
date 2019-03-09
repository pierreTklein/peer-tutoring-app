// eslint-disable-next-line strict
"use strict";

import { TicketList } from "../src/Ticket/TicketList";
import withThemeProvider from "../src/shared/HOC/withThemeProvider";

const ticketData = [
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:03:50.370Z",
    startedAt: "2019-02-26T22:37:54.741Z",
    endedAt: "2019-02-26T22:38:43.796Z",
    rating: 4,
    id: "5c75b7c6142c248c5940305b"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f078",
      firstName: "Student",
      lastName: "Blah"
    },
    createdAt: "2019-02-26T22:47:58.188Z",
    tutorId: null,
    startedAt: "2019-02-27T01:38:18.013Z",
    endedAt: "2019-02-27T01:38:29.308Z",
    id: "5c75c21e64ebe592929f4262"
  },
  {
    courseId: {
      _id: "5ba6e1d844e481ec1ce9c9f6",
      dept: "COMP",
      code: 202,
      name: "Foundations of Programming"
    },
    question: "I don't get something here.",
    studentId: {
      _id: "5c81f0198162dc642056f079",
      firstName: "Student Tutor",
      lastName: "Blah"
    },
    createdAt: "2019-02-27T00:43:26.197Z",
    id: "5c75dd2e40cfe79b17e687c3"
  },
  {
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
];

export default {
  component: withThemeProvider(TicketList),
  props: {
    tickets: ticketData
  }
};
