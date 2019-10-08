import * as React from "react";

import { IAccount, UserType } from "../config";

import { Account } from "../api";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import WithToasterContainer from "../shared/HOC/withToaster";
import View, { IDashboardCard } from "./View";
import { PageContainer, H1 } from "../shared";
import { isUserType } from "../util";
import MyTicketsContainer from "../Ticket/MyTickets";

export interface IDashboardState {
  loading: boolean;
  account?: IAccount;
}

/**
 * Container that renders form to log in.
 */
class Dashboard extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false
    };
    this.staffCards = this.staffCards.bind(this);
  }

  public async componentDidMount() {
    let account;
    // set hacker status
    try {
      const response = await Account.getSelf();
      account = response.data.data;
      this.setState({ account });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    } finally {
      this.setState({ loading: false });
    }
  }
  public render() {
    const { account, loading } = this.state;
    if (!account) {
      return <PageContainer title={"No account found"} loading={loading} />;
    } else if (isUserType(account, UserType.STAFF)) {
      return (
        <PageContainer
          title={"Admin Dashboard"}
          loading={loading}
          maxWidth={"60%"}
        >
          <H1 marginLeft={"0px"} textAlign={"center"}>
            Admin Dashboard
          </H1>
          <View cards={this.generateCards()} />
        </PageContainer>
      );
    } else {
      return <MyTicketsContainer />;
    }
  }
  private generateCards(): IDashboardCard[] {
    const { account } = this.state;
    const cards: IDashboardCard[] = [];
    if (!account) {
      return [];
    }
    if (isUserType(account, UserType.STAFF)) {
      cards.push(...this.staffCards());
    }
    return cards;
  }
  private staffCards(): IDashboardCard[] {
    return [
      {
        title: "Invite User",
        route: "/account/invite"
      },
      {
        title: "Course Stats",
        route: "/stats"
      },
      {
        title: "Course List",
        route: "/course"
      }
    ];
  }
}
export default WithToasterContainer(Dashboard);
