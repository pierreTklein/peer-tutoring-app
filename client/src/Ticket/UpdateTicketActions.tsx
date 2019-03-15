import * as React from "react";
import { ITicket, UserType, createdToday } from "../config";
import { Button, ButtonType, StyledModal } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { Ticket } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { getStatus, TicketStatus } from "../config/TicketStatus";
import { toast } from "react-toastify";
import ConfirmationModal, {
  IConfModalProps
} from "../shared/Elements/ConfirmationModal";

interface ITicketActionProps {
  view: UserType;
  ticket: ITicket;
  onTicketUpdated: (ticket: ITicket) => void;
}
interface ITicketActionState {
  submitting: boolean;
  modalContents: IConfModalProps;
}

export class UpdateTicketActions extends React.Component<
  ITicketActionProps,
  ITicketActionState
> {
  constructor(props: ITicketActionProps) {
    super(props);
    this.state = {
      submitting: false,
      modalContents: {
        title: "",
        body: "",
        isOpen: false,
        onRequestClose: () => undefined,
        onConfirm: () => undefined,
        onDeny: () => undefined
      }
    };
    this.updateTicket = this.updateTicket.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }
  public render() {
    const { ticket, onTicketUpdated, view } = this.props;
    const { submitting, modalContents } = this.state;
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

    const startSessionTitle = "Start this session";
    const abandonSessionTitle = "Yield this question and send it to the queue";
    const endSessionTitle = "Resolve this question";

    return (
      <Flex width={1} justifyContent={"left"} flexWrap={"wrap"}>
        <ConfirmationModal {...modalContents} />
        <Box hidden={hideStart}>
          <Button
            onClick={() => {
              this.updateTicket(ticket, Ticket.start, onTicketUpdated);
            }}
            isLoading={submitting}
            disabled={submitting}
            buttonType={ButtonType.PRIMARY}
            tabIndex={1}
            title={startSessionTitle}
          >
            Start
          </Button>
        </Box>
        <Box hidden={hideAbandon}>
          <Button
            onClick={() => {
              this.handleOpenModal(
                abandonSessionTitle,
                ticket,
                Ticket.abandon,
                onTicketUpdated
              );
            }}
            isLoading={submitting}
            disabled={submitting}
            buttonType={ButtonType.WARNING}
            tabIndex={1}
            title={abandonSessionTitle}
          >
            Yield
          </Button>
        </Box>
        <Box hidden={hideEnd}>
          <Button
            onClick={() => {
              this.handleOpenModal(
                endSessionTitle,
                ticket,
                Ticket.end,
                onTicketUpdated
              );
            }}
            isLoading={submitting}
            disabled={submitting}
            buttonType={ButtonType.SUCCESS}
            tabIndex={1}
            title={endSessionTitle}
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
  private handleOpenModal(
    body: string,
    ticket: ITicket,
    action: (id: string) => Promise<any>,
    cb?: (ticket: ITicket) => void
  ) {
    this.setState({
      modalContents: {
        title: "Please confirm",
        body: body,
        onConfirm: () => this.updateTicket(ticket, action, cb),
        onRequestClose: this.handleCloseModal,
        onDeny: this.handleCloseModal,
        isOpen: true
      }
    });
  }

  private handleCloseModal() {
    this.setState({
      modalContents: {
        ...this.state.modalContents,
        isOpen: false
      }
    });
  }
}
