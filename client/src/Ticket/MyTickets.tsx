import { Flex } from "@rebass/grid";
import * as React from "react";
import Helmet from "react-helmet";

import { IAccount, ITicket, UserType } from "../config";
import { H1, MaxWidthBox, Section, Button } from "../shared/Elements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { Account } from "../api";
import Ticket from "../api/ticket";
import TicketList from "./TicketList";
import { isUserType } from "../util";
import { TicketActions } from "./TicketActions";

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
  }

  public async componentDidMount() {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // last midnight
    try {
      const account = (await Account.getSelf()).data.data;
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
      this.setState({
        account,
        studentTicketsCurrent,
        studentTicketsPast,
        tutorTicketsCurrent,
        tutorTicketsPast
      });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loadingData: false });
    }
  }
  public render() {
    console.log("Hello");
    const {
      account,
      studentTicketsCurrent,
      tutorTicketsCurrent,
      studentTicketsPast,
      tutorTicketsPast,
      loadingData
    } = this.state;
    const showTutor = account && isUserType(account, UserType.TUTOR);
    const showStudent = account && isUserType(account, UserType.STUDENT);
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
          <title>My questions | CSUS Helpdesk</title>
        </Helmet>
        <MaxWidthBox width={0.9} m={"auto"}>
          <H1 textAlign={"center"}>My questions</H1>
          <TicketActions
            hideAssign={!isUserType(account, UserType.TUTOR)}
            hideRequest={!isUserType(account, UserType.STUDENT)}
            disableRequest={studentTicketsCurrent.length > 0}
          />
          <TicketList
            title={"Your current questions"}
            tickets={studentTicketsCurrent}
            hidden={!showStudent}
          />
          <TicketList
            title={"Assigned questions"}
            tickets={tutorTicketsCurrent}
            hidden={!showTutor}
          />
          <TicketList
            title={"Your answered questions"}
            tickets={studentTicketsPast}
            hidden={!showStudent}
          />
          <TicketList
            title={"Questions you answered"}
            tickets={tutorTicketsPast}
            hidden={!showTutor}
          />
        </MaxWidthBox>
      </Flex>
    );
  }
}

export default MyTicketsContainer;
