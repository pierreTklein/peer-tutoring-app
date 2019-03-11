import * as React from "react";
import { ITicket, ICourse, IAccount } from "../config";
import { Panel, H2 } from "../shared";
import { Box } from "@rebass/grid";
import { TicketStatus, getStatus } from "../config/TicketStatus";
import theme from "../shared/Styles/theme";
import { UpdateTicketActions } from "./UpdateTicketActions";
import LabelledField from "../shared/Elements/LabelledField";

interface ITicketProps {
  ticket: ITicket;
  onTicketUpdated: (ticket: ITicket) => void;
  showTutorActions: boolean;
  showStudentActions: boolean;
}

export const Ticket: React.FunctionComponent<
  ITicketProps & React.HTMLAttributes<HTMLElement>
> = ({
  ticket,
  onTicketUpdated,
  showTutorActions,
  showStudentActions,
  ...rest
}) => {
  const courseDescription = parseCourse(ticket.courseId);
  const tutorDescription = parseTutor(ticket.tutorId);
  const studentDescription = parseStudent(ticket.studentId);
  const { question, createdAt, startedAt, endedAt, rating } = ticket;
  const status = getStatus(ticket);
  const opacity = "7F";
  let color = "";
  switch (status) {
    case TicketStatus.ASKED:
      color = theme.colors.red;
      break;
    case TicketStatus.ASSIGNED:
      color = theme.colors.purple;
      break;
    case TicketStatus.STARTED:
      color = theme.colors.yellow;
      break;
    case TicketStatus.ENDED:
      color = theme.colors.green;
      break;
  }
  return (
    <Panel
      flexDirection={"column"}
      alignItems={"left"}
      mx={"5%"}
      my={"2%"}
      p={"15px"}
      backgroundColor={color + opacity}
      {...rest}
    >
      <Box>
        <H2 marginLeft="0px" color={theme.colors.white}>
          {studentDescription} | {courseDescription}
        </H2>
      </Box>
      <LabelledField label={"Status"} text={status} />
      <LabelledField label={"Tutor"} text={tutorDescription} />
      <LabelledField label={"Question"} text={question} />
      <LabelledField
        label={"Asked on"}
        hidden={!createdAt}
        text={new Date(createdAt || "").toLocaleString()}
      />
      <LabelledField
        label={"Started at"}
        hidden={!startedAt}
        text={new Date(startedAt || "").toLocaleString()}
      />
      <LabelledField
        label={"Ended at"}
        hidden={!endedAt}
        text={new Date(endedAt || "").toLocaleString()}
      />
      <UpdateTicketActions
        showTutorActions={showTutorActions}
        showStudentActions={showStudentActions}
        ticket={ticket}
        onTicketUpdated={onTicketUpdated}
      />
    </Panel>
  );
};

function parseCourse(course: string | ICourse) {
  if (typeof course === "string") {
    return `course ID ${course}`;
  } else {
    return `${course.dept} ${course.code}`;
  }
}

function parseTutor(tutor: string | IAccount | undefined) {
  if (!tutor) {
    return "No assigned tutor";
  } else if (typeof tutor === "string") {
    return `${tutor}`;
  } else {
    return `${tutor.firstName} ${tutor.lastName}`;
  }
}

function parseStudent(student: string | IAccount) {
  if (typeof student === "string") {
    return `${student}`;
  } else {
    return `${student.firstName} ${student.lastName.substr(0, 1)}.`;
  }
}
