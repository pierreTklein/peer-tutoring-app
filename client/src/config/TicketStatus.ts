import { ITicket } from ".";

export enum TicketStatus {
  ASKED = "Waiting for tutor",
  ASSIGNED = "Tutor assigned",
  STARTED = "Question being answered",
  ENDED = "Question was resolved"
}

export function getStatus(ticket: ITicket) {
  if (ticket.endedAt) {
    return TicketStatus.ENDED;
  } else if (ticket.startedAt) {
    return TicketStatus.STARTED;
  } else if (ticket.tutorId) {
    return TicketStatus.ASSIGNED;
  } else {
    return TicketStatus.ASKED;
  }
}
