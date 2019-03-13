import { Box } from "@rebass/grid";
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikActions
} from "formik";
import * as React from "react";
import { Redirect } from "react-router";
import { object, string } from "yup";

import { FrontendRoute } from "../config";
import {
  ButtonType,
  H1,
  FormDescription,
  PageContainer
} from "../shared/Elements";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import { Auth } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { toast } from "react-toastify";
import { RouteProps } from "react-router";
import { getNestedAttr } from "../util";

export interface IForgotPasswordState {
  email: string;
  submitted: boolean;
}

export class ForgotPasswordContainer extends React.Component<
  RouteProps,
  IForgotPasswordState
> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      email: getNestedAttr(props, ["location", "state", "email"]) || "",
      submitted: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
  }
  public render() {
    if (this.state.submitted) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <PageContainer title={"Forgot Password"}>
        <Box>
          <H1 textAlign={"center"}>Forgot your password?</H1>
          <FormDescription>
            Enter your email and we will send you a link to reset your password.
          </FormDescription>
        </Box>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: this.state.email
          }}
          onSubmit={this.onSubmit}
          validationSchema={object().shape({
            email: string()
              .required("Required")
              .email("Must be a valid email")
          })}
          render={this.renderFormik}
        />
      </PageContainer>
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
        <SubmitBtn
          isLoading={fp.isSubmitting}
          disabled={fp.isSubmitting}
          buttonType={ButtonType.PRIMARY}
        >
          Send email
        </SubmitBtn>
      </Form>
    );
  }

  private async onSubmit(values: any, actions: FormikActions<any>) {
    try {
      await Auth.forgotPassword(values.email);
      toast.success(`Please check your inbox at ${values.email}`);
    } catch (response) {
      if (response && response.data) {
        ToastError(response.data);
      } else {
        toast.error("There was an error while resetting password.");
      }
    } finally {
      actions.setSubmitting(false);
      this.setState({ submitted: true });
    }
  }
}

export default ForgotPasswordContainer;
