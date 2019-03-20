# peer-tutoring-app

Peer tutoring app to match tutors with tutees. This was built on the [MERN stack](https://books.google.ca/books?id=HnxeDwAAQBAJ&pg=PA7&redir_esc=y#v=onepage&q&f=false), and uses [SendGrid](https://sendgrid.com/) to manage automated emails from the service. To deploy for your own purposes, you can use the one-click deploy to heroku button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

To change the emails that are sent, edit the files found in the [/assets/email/](/assets/email/) directory.

To change the logo of the application, place svgs in [/client/src/assets/images/logo/](/client/src/assets/images/logo/). Make sure to follow the same formatting, and to supply both grey-scale and color versions of the logos.

To change the favicon of the application, place your new favicon in [/client/public/](/client/public/).

## Development

All API work is done in the root-level directory. All frontend work is done in the [/client](/client) directory. API work is written in Javascript, while the Frontend is written in Typescript.

## General Features

This application handles everything that you would expect a web app to have: login / logout, forgot / reset password, change password, confirm email address, etc. The API has many endpoints that are also secured.

## Tutor Features

### Edit Tutor Information

Tutors must state which course they can provide instruction for, which can be found after clicking the `Account` button.

![Edit Tutor Information](/assets/images/tutor_edit.png "Edit Tutor Information")

### Tutor Home Page

The home page contains the questions that the tutor is currently answering, as well as all of the questions that they answered in the past:

![Tutor Home](/assets/images/tutor_home.png "Tutor Home Page")

When a student asks a new question for a course the tutor can instruct, they will be notified via a little notification icon:

![Get New Question](/assets/images/tutor_get_new_q.png "Get New Question")

A GIF of what should happen:

[![Getting a new Question](https://i.gyazo.com/005a4d561e51228686eb146f8a12b12a.gif)](https://gyazo.com/005a4d561e51228686eb146f8a12b12a)

After getting a new question, tutors should find the student in the physical space, and then start the session by clicking the Start button. If they cannot find the student, then they can choose to resolve or yield the question.

![Tutor Actions](/assets/images/tutor_assigned.png "Tutor was assigned")

### "`Start`", "`Yield`", and "`Resolve`"

- `Starting` a question means that you have found the student, and are actively providing instruction.

- `Yielding` a question places it back at the start of the queue, and prevents the given tutor from receiving that question again. This action might be triggered for a few reasons:

  1. The tutor does not feel comfortable interacting with a given student.
  2. The tutor does not know how to answer this question.

- `Resolving` a question removes the question from the queue, and ends the session. This action might be triggered for a few reasons:

  1. The student has an answer to their question.
  2. The student wants to be removed from the queue.
  3. The student was no longer in the room when the tutor was assigned.

## Student Features

In order to ask a question, students must first sign up and then confirm their email address. Afterwards, they will be brought to the Home page, where they will be able to view their current question, and their past questions.

### Student Home Page

![Student Home](/assets/images/student_home.png "Student Home Page")

### Asking New Questions

To prevent spamming, students can only ask one question at a time. In order to ask a question, the student can click the `Ask New Question` button. On clicking, they will be navigated to the following page, where they can provide pertinent information:

![New Question](/assets/images/student_new_q.png "New Question Page")

Once they've asked a new question, they will be placed in the queue. Information about queue position, etc. is found on their question card:

![Student waiting](/assets/images/student_waiting.png "Student waiting")

### Desktop Notifications

If the user allows desktop notifications, they will be notified via the desktop notification. Otherwise, there are in-browser notifications.
