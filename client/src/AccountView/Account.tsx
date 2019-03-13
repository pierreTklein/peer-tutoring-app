import * as React from "react";

import { IAccount } from "../config";
import { H1, PageContainer } from "../shared/Elements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { Account } from "../api";
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
    const { account, loadingData } = this.state;
    const title = `${account ? account.firstName : "User"}'s Profile`;
    return (
      <PageContainer title={title} loading={loadingData || !account}>
        <H1 textAlign={"center"}>{title}</H1>
        {account && <View account={account} />}
      </PageContainer>
    );
  }
}

export default MyAccountContainer;
