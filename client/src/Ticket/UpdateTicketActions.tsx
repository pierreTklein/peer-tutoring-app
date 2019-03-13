import * as React from "react";
import { ITicket, UserType, createdToday } from "../config";
import { Button, ButtonType } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { Ticket } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { getStatus, TicketStatus } from "../config/TicketStatus";
import { toast } from "react-toastify";

interface ITicketActionProps {
  view: UserType;
  ticket: ITicket;
  onTicketUpdated: (ticket: ITicket) => void;
}
interface ITicketActionState {
  submitting: boolean;
}

export class UpdateTicketActions extends React.Component<
  ITicketActionProps,
  ITicketActionState
> {
  constructor(props: ITicketActionProps) {
    super(props);
    this.state = {
      submitting: false
    };
    this.updateTicket = this.updateTicket.bind(this);
  }
  public render() {
    const { ticket, onTicketUpdated, view } = this.props;
    const { submitting } = this.state;
    const ticketStatus: TicketStatus = getStatus(ticket);
    const wasCreatedToday = createdToday(ticket);

    const hideStart =
      view === UserType.STUDENT ||
      ticketStatus !== TicketStatus.ASSIGNED ||
      !wasCreatedToday;
    const hideEnd = ticketStatus === TicketStatus.ENDED || !wasCreatedToday;
    const hideAbandon =
      ticketStatus === TicketStatus.ASKED ||
      ticketStatus === TicketStatus.ENDED ||
      view === UserType.STUDENT ||
      !wasCreatedToday;

    return (
      <Flex width={1} justifyContent={"left"} flexWrap={"wrap"}>
        <Box hidden={hideStart}>
          <Button
            onClick={() => {
              this.updateTicket(ticket, Ticket.start, onTicketUpdated);
            }}
            isLoading={submitting}
            disabled={submitting}
            buttonType={ButtonType.PRIMARY}
            tabIndex={1}
            title={"Start the session"}
          >
            Start
          </Button>
        </Box>
        <Box hidden={hideAbandon}>
          <Button
            onClick={() => {
              this.updateTicket(ticket, Ticket.abandon, onTicketUpdated);
            }}
            isLoading={submitting}
            disabled={submitting}
            buttonType={ButtonType.WARNING}
            tabIndex={1}
            title={"End session, and return to queue"}
          >
            Abandon
          </Button>
        </Box>
        <Box hidden={hideEnd}>
          <Button
            onClick={() => {
              this.updateTicket(ticket, Ticket.end, onTicketUpdated);
            }}
            isLoading={submitting}
            disabled={submitting}
            buttonType={ButtonType.SUCCESS}
            tabIndex={1}
            title={"End the session"}
          >
            Resolve
          </Button>
        </Box>
      </Flex>
    );
  }
  private async updateTicket(
    ticket: ITicket,
    action: (id: string) => Promise<any>,
    cb?: (ticket: ITicket) => void
  ) {
    try {
      this.setState({ submitting: true });
      await action(ticket.id || "");
      cb && cb(ticket);
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      } else {
        toast.error("There was an unexpected error.");
      }
    } finally {
      this.setState({ submitting: false });
    }
  }
}
