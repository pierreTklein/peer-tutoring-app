import { Box, Flex } from "@rebass/grid";
import { AxiosResponse } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import {
  FrontendRoute,
  FrontendRoute as routes,
  IAccount,
  UserType
} from "../config";

import { APIResponse, Auth, Account } from "../api";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import WithToasterContainer from "../shared/HOC/withToaster";
import View, { IDashboardCard } from "./View";

export interface IDashboardState {
  account?: IAccount;
}

/**
 * Container that renders form to log in.
 */
class Dashboard extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
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
    }
  }
  public render() {
    return <View cards={this.generateCards()} title={"Dashboard"} />;
  }
  private generateCards(): IDashboardCard[] {
    const { account } = this.state;
    const cards: IDashboardCard[] = [];
    if (!account) {
      return [];
    }
    return cards;
  }

  private tutorCards() {
    return [
      {
        title: "Start O.H.",
        route: "/",
        imageSrc: ""
      }
      // {
      //   title: "Current tickets",
      //   route: string,
      //   imageSrc: any,
      //   validation: () => boolean,
      //   hidden: boolean,
      //   disabled: boolean
      // },
      // {
      //   title: "Past tickets",
      //   route: string,
      //   imageSrc: any,
      //   validation: () => boolean,
      //   hidden: boolean,
      //   disabled: boolean
      // }
    ];
  }
}
export default WithToasterContainer(Dashboard);
