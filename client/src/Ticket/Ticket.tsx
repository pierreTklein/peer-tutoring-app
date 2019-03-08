import * as React from "react";
import { ITicket, ICourse, IAccount } from "../config";
import { Panel, H2 } from "../shared";
import { Box } from "@rebass/grid";
import LabelledField from "../shared/Elements/LabelledField";

interface ITicketProps {
  ticket: ITicket;
}

export const Ticket: React.FunctionComponent<ITicketProps> = ({ ticket }) => {
  const courseDescription = parseCourse(ticket.courseId);
  const tutorDescription = parseTutor(ticket.tutorId);
  const { question, createdAt, startedAt, endedAt, rating } = ticket;
  return (
    <Panel flexDirection={"column"} alignItems={"left"} m={"2%"}>
      <Box>
        <H2 marginLeft="0px">{courseDescription}</H2>
      </Box>
      <LabelledField label={"Tutor"} text={tutorDescription} />
      <LabelledField label={"question"} text={question} />
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
