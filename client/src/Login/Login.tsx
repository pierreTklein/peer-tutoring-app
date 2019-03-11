import { Box, Flex } from "@rebass/grid";
import { AxiosResponse } from "axios";
import * as QueryString from "query-string";
import * as React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import ToastError from "../shared/Form/validationErrorGenerator";
import ForgotPasswordLinkComponent from "./ForgotPasswordLink";

import { Button, H1, MaxWidthBox, Panel, ButtonType } from "../shared/Elements";
import { EmailInput, Form, PasswordInput } from "../shared/Form";

import { APIResponse, Auth } from "../api";

import { EMAIL_LABEL, FrontendRoute, PASSWORD_LABEL } from "../config";

export interface ILoginState {
  email: string;
  password: string;
  submitting: boolean;
}

/**
 * Container that renders form to log in.
 */
class LoginContainer extends React.Component<RouteComponentProps, ILoginState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
  }
  public render() {
    return (
      <MaxWidthBox m={"auto"} alignSelf={"center"}>
        <Helmet>
          <title>Login | CSUS Helpdesk</title>
        </Helmet>
        <Form>
          <Panel alignItems={"center"} flexDirection={"column"} p={"5%"}>
            <Box alignSelf={"flex-start"}>
              <H1 fontSize={"24px"}>Sign in / Register</H1>
            </Box>
            <EmailInput
              label={EMAIL_LABEL}
              onEmailChanged={this.onEmailChanged}
              value={this.state.email}
              isTight={true}
            />
            <PasswordInput
              label={PASSWORD_LABEL}
              onPasswordChanged={this.onPasswordChanged}
              value={this.state.password}
              isTight={true}
            />
            <Box alignSelf={"flex-end"} mb={"30px"} pr={"10px"}>
              <ForgotPasswordLinkComponent />
            </Box>
            <Flex>
              <Box pr={"5px"}>
                <Button
                  type="button"
                  onClick={this.handleSubmit}
                  buttonType={ButtonType.PRIMARY}
                  isLoading={this.state.submitting}
                >
                  Sign in
                </Button>
              </Box>
              <Box pl={"5px"}>
                <Link
                  to={{
                    pathname: FrontendRoute.CREATE_ACCOUNT_PAGE,
                    state: { ...this.state }
                  }}
                >
                  <Button
                    type="button"
                    buttonType={ButtonType.SECONDARY}
                    isLoading={this.state.submitting}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Panel>
        </Form>
      </MaxWidthBox>
    );
  }

  /**
   * Function that calls the login function once the form is submitted.
   */
  private async handleSubmit() {
    this.setState({ submitting: true });
    try {
      await Auth.login(this.state.email, this.state.password);
      const redir = this.getRedirectLink() || FrontendRoute.HOME_PAGE;
      this.props.history.push(redir);
    } catch (response) {
      if (response && response.data) {
        ToastError(response.data);
      }
    } finally {
      this.setState({ submitting: false });
    }
  }
  /**
   * Callback that is called once email is added.
   * @param email The updated email
   */
  private onEmailChanged(email: string) {
    this.setState({ email });
  }
  /**
   * Callback that is called once password is added.
   * @param password The updated password
   */
  private onPasswordChanged(password: string) {
    this.setState({ password });
  }
  /**
   * Returns the redirect link, or undefined if it doesn't exist.
   */
  private getRedirectLink(): any {
    const queries: any = QueryString.parse(location.search);
    if (queries.redir) {
      return queries.redir.toString();
    } else {
      return undefined;
    }
  }
}
export default withRouter<RouteComponentProps>(LoginContainer);
