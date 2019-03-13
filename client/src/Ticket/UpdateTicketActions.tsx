import * as React from "react";
import { ITicket } from "../config";
import { Button, ButtonType } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { Ticket } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { getStatus, TicketStatus } from "../config/TicketStatus";
import { toast } from "react-toastify";

interface ITicketActionProps {
  showTutorActions: boolean;
  showStudentActions: boolean;
  ticket: ITicket;
  onTicketUpdated: (ticket: ITicket) => void;
}

export const UpdateTicketActions: React.FunctionComponent<
  ITicketActionProps
> = ({ showTutorActions, showStudentActions, ticket, onTicketUpdated }) => {
  const ticketStatus: TicketStatus = getStatus(ticket);

  const disableStart = ticketStatus !== TicketStatus.ASSIGNED;
  const hideStart = !showTutorActions;

  const disableEnd = ticketStatus === TicketStatus.ENDED;
  const hideEnd = !(showTutorActions || showStudentActions);

  const disableAbandon =
    ticketStatus === TicketStatus.ASKED || ticketStatus === TicketStatus.ENDED;
  const hideAbandon = disableAbandon || !showTutorActions;

  return (
    <Flex width={1} justifyContent={"left"} flexWrap={"wrap"}>
      <Box hidden={hideStart || disableStart}>
        <Button
          disabled={disableStart}
          onClick={() => {
            onStartTicket(ticket, onTicketUpdated);
          }}
          buttonType={ButtonType.PRIMARY}
          tabIndex={1}
          title={"Start the session"}
        >
          Start
        </Button>
      </Box>
      <Box hidden={hideAbandon || disableEnd}>
        <Button
          disabled={disableAbandon}
          onClick={() => {
            onAbandonTicket(ticket, onTicketUpdated);
          }}
          buttonType={ButtonType.WARNING}
          tabIndex={1}
          title={"End session, and return to queue"}
        >
          Abandon
        </Button>
      </Box>
      <Box hidden={hideEnd || disableEnd}>
        <Button
          disabled={disableEnd}
          onClick={() => {
            onEndTicket(ticket, onTicketUpdated);
          }}
          buttonType={ButtonType.SUCCESS}
          tabIndex={1}
          title={"End the session"}
        >
          Resolve
        </Button>
      </Box>
    </Flex>
  );
};

async function onStartTicket(
  ticket: ITicket,
  onTicketUpdated?: (ticket: ITicket) => void
) {
  try {
    await Ticket.start(ticket.id || "");
    onTicketUpdated && onTicketUpdated(ticket);
  } catch (e) {
    ToastError(e.data);
  }
}
async function onEndTicket(
  ticket: ITicket,
  onTicketUpdated?: (ticket: ITicket) => void
) {
  try {
    await Ticket.end(ticket.id || "");
    onTicketUpdated && onTicketUpdated(ticket);
  } catch (e) {
    if (e && e.data) {
      ToastError(e.data);
    } else {
      toast.error("Unexpected error");
    }
  }
}

async function onAbandonTicket(
  ticket: ITicket,
  onTicketUpdated?: (ticket: ITicket) => void
) {
  try {
    await Ticket.abandon(ticket.id || "");
    onTicketUpdated && onTicketUpdated(ticket);
  } catch (e) {
    ToastError(e.data);
  }
}
