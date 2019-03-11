import * as React from "react";
import { ITicket, ICourse, IAccount } from "../config";
import { Panel, H2 } from "../shared";
import { Box } from "@rebass/grid";
import { TicketStatus, getStatus } from "../config/TicketStatus";
import theme from "../shared/Styles/theme";
import { UpdateTicketActions } from "./UpdateTicketActions";
import LabelledField from "../shared/Elements/LabelledField";
import Collapsible from "../shared/Elements/Collapsible";

interface ITicketProps {
  ticket: ITicket;
  onTicketUpdated: (ticket: ITicket) => void;
  showTutorActions: boolean;
  showStudentActions: boolean;
  showTicketDetails: boolean;
  onCollapseChange?: (isOpen: boolean) => void;
}

export const Ticket: React.FunctionComponent<
  ITicketProps & React.HTMLAttributes<HTMLElement>
> = ({
  ticket,
  onTicketUpdated,
  showTutorActions,
  showStudentActions,
  onCollapseChange,
  showTicketDetails,
  ...rest
}) => {
  const courseDescription = parseCourse(ticket.courseId);
  const tutorDescription = parseTutor(ticket.tutorId);
  const studentDescription = parseStudent(ticket.studentId);
  const { question, createdAt, startedAt, endedAt, category, rating } = ticket;
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
        <Collapsible
          titleColor={theme.colors.white}
          title={`${studentDescription} | ${courseDescription}`}
          open={showTicketDetails}
          onToggle={onCollapseChange}
        >
          <LabelledField label={"Status"} text={status} />
          <LabelledField label={"Tutor"} text={tutorDescription} />
          <LabelledField label={"Category"} text={category} />
          <LabelledField label={"Question"} text={question} />
          <LabelledField
            label={"Asked on"}
            hidden={!createdAt}
            text={createdAt && createdAt.toLocaleString()}
          />
          <LabelledField
            label={"Started at"}
            hidden={!startedAt}
            text={startedAt && startedAt.toLocaleString()}
          />
          <LabelledField
            label={"Ended at"}
            hidden={!endedAt}
            text={endedAt && endedAt.toLocaleString()}
          />
        </Collapsible>
      </Box>
      <UpdateTicketActions
        showTutorActions={showTutorActions}
        showStudentActions={showStudentActions}
        ticket={ticket}
        onTicketUpdated={onTicketUpdated}
      />{" "}
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
    return "Pending...";
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
