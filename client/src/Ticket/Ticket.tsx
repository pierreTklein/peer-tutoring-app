import * as React from "react";
import {
  ITicket,
  parseCourse,
  parseTutor,
  parseStudent,
  UserType
} from "../config";
import { Panel } from "../shared";
import { Box } from "@rebass/grid";
import { TicketStatus, getStatus } from "../config/TicketStatus";
import theme from "../shared/Styles/theme";
import { UpdateTicketActions } from "./UpdateTicketActions";
import LabelledField from "../shared/Elements/LabelledField";
import Collapsible from "../shared/Elements/Collapsible";

interface ITicketProps {
  ticket: ITicket;
  onTicketUpdated: (ticket: ITicket) => void;
  view: UserType;
  showTicketDetails: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const Ticket: React.FunctionComponent<
  ITicketProps & React.HTMLAttributes<HTMLElement>
> = ({
  ticket,
  onTicketUpdated,
  onToggle,
  showTicketDetails,
  view,
  ...rest
}) => {
  const courseDescription = parseCourse(ticket.courseId);
  const tutorDescription = parseTutor(ticket.tutorId);
  const studentDescription = parseStudent(ticket.studentId);
  const { question, createdAt, startedAt, endedAt, category } = ticket;
  const status = getStatus(ticket);
  const opacity = "7F";
  let color = "";
  switch (status) {
    case TicketStatus.ASKED:
      color = theme.colors.red;
      break;
    case TicketStatus.ASSIGNED:
      color = theme.colors.orange;
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
          onToggle={onToggle}
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
        view={view}
        ticket={ticket}
        onTicketUpdated={onTicketUpdated}
      />
    </Panel>
  );
};
