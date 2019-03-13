import * as React from "react";

import { H1, PageContainer, Button, ButtonType } from "../shared/Elements";
import { Account } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { toast } from "react-toastify";

interface INotConfirmedState {
  submitting: boolean;
  submitted: boolean;
}

class NotConfirmedContainer extends React.Component<{}, INotConfirmedState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      submitting: false,
      submitted: false
    };
    this.onResendEmail = this.onResendEmail.bind(this);
  }
  public render() {
    const { submitting, submitted } = this.state;
    return (
      <PageContainer title={"Confirm Your Account"} loading={false}>
        <H1 textAlign={"center"}>You must confirm your account.</H1>
        <Button
          onClick={this.onResendEmail}
          buttonType={ButtonType.PRIMARY}
          isLoading={submitting}
          disabled={submitting || submitted}
        >
          {submitted ? "Sent! Check your email." : "Resend Email"}
        </Button>
      </PageContainer>
    );
  }

  private async onResendEmail() {
    this.setState({ submitting: true });
    try {
      await Account.resendConfirm();
      this.setState({ submitted: true });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      } else {
        toast.error("There was an unexpected error.");
      }
    } finally {
      this.setState({ submitting: false });
    }
  }
}
export default NotConfirmedContainer;
