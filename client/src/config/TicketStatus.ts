import { ITicket } from ".";

export enum TicketStatus {
  ASKED = "Asked",
  ASSIGNED = "Tutor assigned",
  STARTED = "In progress",
  ENDED = "Ended"
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
