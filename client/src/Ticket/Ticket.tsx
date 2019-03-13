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
import { toOrdinalSuffix } from "../util";

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

  let title = `${studentDescription} | ${courseDescription}`;
  if (ticket.queue && status === TicketStatus.ASKED) {
    title = `${toOrdinalSuffix(ticket.queue)} in line for ${courseDescription}`;
  } else if (view === UserType.STUDENT) {
    title = `${category || ""} question for ${courseDescription}`;
  }

  return (
    <Panel
      flexDirection={"column"}
      alignItems={"left"}
      my={"2%"}
      p={"15px"}
      backgroundColor={color + opacity}
      {...rest}
    >
      <Box>
        <Collapsible
          titleColor={theme.colors.white}
          title={title}
          open={showTicketDetails}
          onToggle={onToggle}
        >
          <LabelledField label={"Status"} text={status} />
          <LabelledField label={"Tutor"} text={tutorDescription} />
          <LabelledField label={"Category"} text={category} />
          <LabelledField label={"Question"} text={question} />
          <LabelledField
            label={"Asked"}
            hidden={!createdAt}
            text={createdAt && new Date(createdAt).toLocaleString("en-US")}
          />
          <LabelledField
            label={"Started"}
            hidden={!startedAt}
            text={startedAt && new Date(startedAt).toLocaleString("en-US")}
          />
          <LabelledField
            label={"Resolved"}
            hidden={!endedAt}
            text={endedAt && new Date(endedAt).toLocaleString("en-US")}
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
