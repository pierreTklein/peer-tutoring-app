import * as React from "react";

import {
  IAccount,
  ITicket,
  UserType,
  compareTicket,
  getCourseId,
  createdToday,
  ICourse,
  FrontendRoute
} from "../config";
import { H1, PageContainer, H2 } from "../shared/Elements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { Account, SocketConn, Tutor } from "../api";
import Ticket from "../api/ticket";
import { isUserType } from "../util";
import { TicketActions as ReceiveNewTicketActions } from "./ReceiveNewTicketActions";
import ToastError from "../shared/Form/validationErrorGenerator";
import { TicketList } from "./TicketList";
import { Link } from "react-router-dom";

interface ITicketsContainerState {
  loadingData: boolean;
  account: IAccount | null;
  studentTicketsPast: ITicket[];
  studentTicketsCurrent: ITicket[];
  tutorTicketsPast: ITicket[];
  tutorTicketsCurrent: ITicket[];
  tutorTicketQueue: ITicket[];
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
      tutorTicketsCurrent: [],
      tutorTicketQueue: []
    };
    this.queryTickets = this.queryTickets.bind(this);
    this.fetchQueuePosition = this.fetchQueuePosition.bind(this);
    this.getOneQueuePosition = this.getOneQueuePosition.bind(this);
    this.queryTutorQueue = this.queryTutorQueue.bind(this);
  }

  public async componentDidMount() {
    try {
      /** Mount the event listeners */
      SocketConn.addTicketUpdateEventListener(this.queryTickets);
      SocketConn.addTicketUpdateEventListener(this.queryTutorQueue);
      SocketConn.addQueueUpdateEventListener(this.queryTickets);
      SocketConn.addQueueUpdateEventListener(this.queryTutorQueue);

      const account = (await Account.getSelf()).data.data;
      if (isUserType(account, UserType.TUTOR)) {
        account.tutor.courses.forEach((course: string | ICourse) => {
          const courseId = getCourseId(course);
          SocketConn.joinRoom(courseId);
        });
      }
      const id = account.id || account._id || undefined;
      if (id) {
        SocketConn.joinRoom(id);
      }
      this.setState({ account });
      await this.queryTickets();
      await this.queryTutorQueue();
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loadingData: false });
    }
  }
  public componentWillUnmount() {
    /** Unmount the event listeners */
    SocketConn.removeTicketUpdateEventListener(this.queryTickets);
    SocketConn.removeTicketUpdateEventListener(this.queryTutorQueue);
    SocketConn.removeQueueUpdateEventListener(this.queryTickets);
    SocketConn.removeQueueUpdateEventListener(this.queryTutorQueue);
  }

  public async queryTickets() {
    const { account } = this.state;
    if (!account) {
      return;
    }
    try {
      const tickets: ITicket[] = (await Ticket.getSelf(true, true, false)).data
        .data.tickets;

      /** Remove old socket connections */
      this.state.studentTicketsCurrent.forEach(ticket => {
        const courseId = getCourseId(ticket.courseId);
        SocketConn.leaveRoom(courseId);
      });

      const studentTicketsCurrent: ITicket[] = [];
      const studentTicketsPast: ITicket[] = [];
      const tutorTicketsCurrent: ITicket[] = [];
      const tutorTicketsPast: ITicket[] = [];
      tickets.forEach(ticket => {
        const studentAcc = ticket.studentId as IAccount;
        const tutorAcc = ticket.tutorId as IAccount;
        if (studentAcc._id === account.id) {
          if (ticket.endedAt || !createdToday(ticket)) {
            studentTicketsPast.push(ticket);
          } else {
            studentTicketsCurrent.push(ticket);
            /** Add socket connections to this course */
            const courseId = getCourseId(ticket.courseId);
            SocketConn.joinRoom(courseId);
          }
        }
        if (tutorAcc && tutorAcc._id === account.id) {
          if (ticket.endedAt || !createdToday(ticket)) {
            tutorTicketsPast.push(ticket);
          } else {
            tutorTicketsCurrent.push(ticket);
          }
        }
      });
      await this.fetchQueuePosition(studentTicketsCurrent);

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

  public async queryTutorQueue() {
    const { account } = this.state;
    if (!account || !isUserType(account, UserType.TUTOR)) {
      return;
    }
    try {
      const tickets: ITicket[] = (await Tutor.getQueue(account.id)).data.data
        .tickets;
      this.setState({ tutorTicketQueue: tickets });
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
      tutorTicketQueue,
      loadingData
    } = this.state;
    const showTutor = (account &&
      isUserType(account, UserType.TUTOR)) as boolean;
    const showStudent = (account &&
      isUserType(account, UserType.STUDENT)) as boolean;
    const hasNoCourses =
      showTutor && account && account.tutor.courses.length === 0;
    return (
      <PageContainer title={"Questions"} loading={loadingData || !account}>
        <H1 textAlign={"center"}>My questions</H1>
        {hasNoCourses && (
          <H2 textAlign={"center"}>
            <Link to={FrontendRoute.EDIT_ACCOUNT_PAGE}>
              Add a course to your account profile.
            </Link>
          </H2>
        )}
        <ReceiveNewTicketActions
          numWaiting={tutorTicketQueue.length}
          hideAssign={!showTutor}
          hideRequest={!showStudent}
          disableRequest={studentTicketsCurrent.length > 0}
          onQuestionAssigned={this.queryTickets}
        />
        <TicketList
          title={"Your current questions"}
          tickets={studentTicketsCurrent}
          hidden={!showStudent}
          view={UserType.STUDENT}
          onTicketUpdated={this.queryTickets}
          defaultOpened={true}
        />
        <TicketList
          title={"Assigned questions"}
          tickets={tutorTicketsCurrent}
          hidden={!showTutor}
          view={UserType.TUTOR}
          onTicketUpdated={this.queryTickets}
          defaultOpened={true}
        />
        <TicketList
          title={"Your old questions"}
          tickets={studentTicketsPast}
          hidden={!showStudent}
          view={UserType.STUDENT}
          onTicketUpdated={this.queryTickets}
        />
        <TicketList
          title={"Questions you answered"}
          tickets={tutorTicketsPast}
          hidden={!showTutor}
          view={UserType.TUTOR}
          onTicketUpdated={this.queryTickets}
        />
      </PageContainer>
    );
  }

  private async fetchQueuePosition(tickets: ITicket[]) {
    try {
      return await Promise.all(
        tickets.map(async ticket => {
          ticket.queue = await this.getOneQueuePosition(ticket);
          return ticket;
        })
      );
    } catch (e) {
      console.error("Could not fetch queue positions", e);
      return tickets;
    }
  }

  private async getOneQueuePosition(ticket: ITicket) {
    try {
      return (await Ticket.getPosition(ticket.id!)).data.data;
    } catch (e) {
      console.error("could not fetch queue position", e);
    }
  }
}

export default MyTicketsContainer;
