import * as React from "react";

import { Account } from "../api";
import { getTokenFromQuery, FrontendRoute } from "../config";
import { H1, PageContainer, H2 } from "../shared/Elements";
import ToastError from "../shared/Form/validationErrorGenerator";
import DelayedRedirect from "../shared/Elements/DelayedRedirect";
import { toast } from "react-toastify";

interface IConfirmAccountState {
  attempting: boolean;
  wasConfirmed: boolean;
}

class ConfirmAccountContainer extends React.Component<
  {},
  IConfirmAccountState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      attempting: true,
      wasConfirmed: false
    };
  }
  public render() {
    const { attempting, wasConfirmed } = this.state;
    const title = attempting
      ? "Confirming..."
      : wasConfirmed
      ? "Confirmed!"
      : "Not Confirmed.";
    return (
      <PageContainer title={title} loading={attempting}>
        <H1 textAlign={"center"}>Your account was {title}</H1>
        <H2 textAlign={"center"}>You will be redirected shortly...</H2>
        {!attempting && (
          <DelayedRedirect
            to={
              wasConfirmed
                ? FrontendRoute.HOME_PAGE
                : FrontendRoute.CONFIRM_ACCOUNT_RESEND
            }
            delay={2000}
          />
        )}
      </PageContainer>
    );
  }

  public async componentDidMount() {
    try {
      const token = getTokenFromQuery();
      await Account.confirm(token);
      this.setState({
        wasConfirmed: true
      });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      } else {
        toast.error("There was an unexpected error.");
      }
    } finally {
      this.setState({
        attempting: false
      });
    }
  }
}
export default ConfirmAccountContainer;
