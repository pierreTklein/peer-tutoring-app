import { Flex } from "@rebass/grid";
import * as React from "react";
import Helmet from "react-helmet";

import { IAccount, ITicket, UserType } from "../config";
import { H1, MaxWidthBox, Section } from "../shared/Elements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { Account } from "../api";
import { isUserType } from "../util";
import { View } from "./View";

interface IAccountContainerProps {
  loadingData: boolean;
  account: IAccount | null;
}

export class MyAccountContainer extends React.Component<
  {},
  IAccountContainerProps
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loadingData: true,
      account: null
    };
  }

  public async componentDidMount() {
    try {
      const account = (await Account.getSelf(true)).data.data;
      this.setState({ account });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loadingData: false });
    }
  }
  public render() {
    const { account } = this.state;
    if (!account) {
      return (
        <MaxWidthBox>
          <H1>Loading...</H1>
        </MaxWidthBox>
      );
    }
    return <View account={account} />;
  }
}

export default MyAccountContainer;
