import { Flex } from "@rebass/grid";
import * as React from "react";
import Helmet from "react-helmet";

import { IAccount, ITicket, UserType, compareTicket } from "../config";
import { H1, MaxWidthBox } from "../shared/Elements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { Account, SocketConn } from "../api";
import Ticket from "../api/ticket";
import TicketList from "./TicketList";
import { isUserType } from "../util";
import { TicketActions as ReceiveNewTicketActions } from "./ReceiveNewTicketActions";
import ToastError from "../shared/Form/validationErrorGenerator";

interface ITicketsContainerState {
  loadingData: boolean;
  account: IAccount | null;
  studentTicketsPast: ITicket[];
  studentTicketsCurrent: ITicket[];
  tutorTicketsPast: ITicket[];
  tutorTicketsCurrent: ITicket[];
}

export class MyTicketsContainer extends React.Component<
  {},
  ITicketsContainerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loadingData: true,
      account: null,
      studentTicketsPast: [],
      studentTicketsCurrent: [],
      tutorTicketsPast: [],
      tutorTicketsCurrent: []
    };
    this.queryTickets = this.queryTickets.bind(this);
  }

  public async componentDidMount() {
    try {
      SocketConn.addTicketUpdateEventListener(this.queryTickets);
      const account = (await Account.getSelf()).data.data;
      this.setState({ account }, this.queryTickets);
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loadingData: false });
    }
  }
  public componentWillUnmount() {
    SocketConn.removeTicketUpdateEventListener(this.queryTickets);
  }

  public async queryTickets() {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    const { account } = this.state;
    if (!account) {
      return;
    }
    try {
      const tickets: ITicket[] = (await Ticket.getSelf(true, true, false)).data
        .data.tickets;
      const studentTicketsCurrent: ITicket[] = [];
      const studentTicketsPast: ITicket[] = [];
      const tutorTicketsCurrent: ITicket[] = [];
      const tutorTicketsPast: ITicket[] = [];
      tickets.forEach(ticket => {
        const studentAcc = ticket.studentId as IAccount;
        const tutorAcc = ticket.tutorId as IAccount;
        if (studentAcc._id === account.id) {
          if (
            ticket.endedAt ||
            (ticket.createdAt && new Date(ticket.createdAt) < midnight)
          ) {
            studentTicketsPast.push(ticket);
          } else {
            studentTicketsCurrent.push(ticket);
          }
        }
        if (tutorAcc && tutorAcc._id === account.id) {
          if (
            ticket.endedAt ||
            (ticket.createdAt && new Date(ticket.createdAt) < midnight)
          ) {
            tutorTicketsPast.push(ticket);
          } else {
            tutorTicketsCurrent.push(ticket);
          }
        }
      });
      studentTicketsCurrent.sort(compareTicket);
      studentTicketsPast.sort(compareTicket);
      tutorTicketsCurrent.sort(compareTicket);
      tutorTicketsPast.sort(compareTicket);
      this.setState({
        studentTicketsCurrent,
        studentTicketsPast,
        tutorTicketsCurrent,
        tutorTicketsPast
      });
    } catch (e) {
      ToastError(e.data);
    }
  }
  public render() {
    const {
      account,
      studentTicketsCurrent,
      tutorTicketsCurrent,
      studentTicketsPast,
      tutorTicketsPast,
      loadingData
    } = this.state;
    const showTutor = (account &&
      isUserType(account, UserType.TUTOR)) as boolean;
    const showStudent = (account &&
      isUserType(account, UserType.STUDENT)) as boolean;
    if (loadingData || !account) {
      return (
        <MaxWidthBox width={0.9} m={"auto"}>
          <H1>Loading...</H1>
        </MaxWidthBox>
      );
    }
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Helmet>
          <title>Questions | CSUS Helpdesk</title>
        </Helmet>
        <MaxWidthBox width={0.9} m={"auto"}>
          <H1 textAlign={"center"}>My questions</H1>
          <ReceiveNewTicketActions
            hideAssign={!isUserType(account, UserType.TUTOR)}
            hideRequest={!isUserType(account, UserType.STUDENT)}
            disableRequest={studentTicketsCurrent.length > 0}
            onQuestionAssigned={this.queryTickets}
          />
          <TicketList
            title={"Your current questions"}
            tickets={studentTicketsCurrent}
            hidden={!showStudent}
            showStudentActions={showStudent}
            showTutorActions={showTutor}
            onTicketUpdated={this.queryTickets}
            defaultOpened={true}
          />
          <TicketList
            title={"Assigned questions"}
            tickets={tutorTicketsCurrent}
            hidden={!showTutor}
            showStudentActions={showStudent}
            showTutorActions={showTutor}
            onTicketUpdated={this.queryTickets}
            defaultOpened={true}
          />
          <TicketList
            title={"Your old questions"}
            tickets={studentTicketsPast}
            hidden={!showStudent}
            showStudentActions={showStudent}
            showTutorActions={showTutor}
            onTicketUpdated={this.queryTickets}
          />
          <TicketList
            title={"Questions you answered"}
            tickets={tutorTicketsPast}
            hidden={!showTutor}
            showStudentActions={showStudent}
            showTutorActions={showTutor}
            onTicketUpdated={this.queryTickets}
          />
        </MaxWidthBox>
      </Flex>
    );
  }
}

export default MyTicketsContainer;
