import { Box, Flex } from "@rebass/grid";
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikActions
} from "formik";
import * as QueryString from "query-string";
import * as React from "react";
import Helmet from "react-helmet";
import { Redirect } from "react-router";
import { object, string } from "yup";

import { FrontendRoute } from "../config";
import { Button, MaxWidthBox, ButtonType, Panel, H1 } from "../shared/Elements";
import { Form } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import { Auth } from "../api";
import ForgotPasswordLinkComponent from "./ForgotPasswordLink";
import { Link } from "react-router-dom";
import ToastError from "../shared/Form/validationErrorGenerator";
import { toast } from "react-toastify";

export interface ILoginState {
  email: string;
  password: string;
  submitting: boolean;
  success: boolean;
  redirTo: string;
}

export class CreateTicketContainer extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitting: false,
      success: false,
      redirTo: this.getRedirectLink() || FrontendRoute.HOME_PAGE
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
  }
  public render() {
    if (this.state.success && !this.state.submitting) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <MaxWidthBox width={0.9} m={"auto"}>
        <Helmet>
          <title>Login | CSUS Helpdesk</title>
        </Helmet>
        <Panel alignItems={"center"} flexDirection={"column"} p={"5%"}>
          <Box alignSelf={"flex-start"}>
            <H1 fontSize={"24px"}>Sign in / Register</H1>
          </Box>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={this.onSubmit}
            validationSchema={object().shape({
              email: string()
                .required("Required")
                .email("Must be a valid email"),
              password: string().required("Required")
            })}
            render={this.renderFormik}
          />
        </Panel>
      </MaxWidthBox>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          name={"email"}
          component={FormikElements.Email}
          placeholder={"Email"}
          label={"Email"}
          required={true}
          value={fp.values.email}
        />
        <ErrorMessage component={FormikElements.Error} name="email" />
        <FastField
          name={"password"}
          component={FormikElements.Password}
          placeholder={"Password"}
          label={"Password"}
          required={true}
          value={fp.values.password}
        />
        <ErrorMessage component={FormikElements.Error} name="email" />
        <Flex width={1} justifyContent={"flex-end"} mb={"30px"}>
          <Box pr={"10px"}>
            <ForgotPasswordLinkComponent />
          </Box>
        </Flex>
        <Flex width={1} justifyContent={"center"}>
          <Box pr={"5px"}>
            <Button
              type="submit"
              buttonType={ButtonType.PRIMARY}
              isLoading={fp.isSubmitting}
              disabled={fp.isSubmitting}
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
                isLoading={fp.isSubmitting}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Flex>
      </Form>
    );
  }

  private async onSubmit(values: any, actions: FormikActions<any>) {
    this.setState({ submitting: true });
    try {
      await Auth.login(values.email, values.password);
      this.setState({ success: true });
    } catch (response) {
      if (response && response.data) {
        ToastError(response.data);
      } else {
        toast.error("There was an error while logging you in.");
      }
    } finally {
      actions.setSubmitting(false);
      this.setState({ submitting: false });
    }
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

export default CreateTicketContainer;
