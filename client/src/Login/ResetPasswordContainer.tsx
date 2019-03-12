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
import { object, string, ref } from "yup";

import { FrontendRoute, getTokenFromQuery } from "../config";
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

export interface IResetPasswordContainerState {
  isSubmitted: boolean;
}

class ResetPasswordContainer extends React.Component<
  {},
  IResetPasswordContainerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isSubmitted: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
  }
  public render() {
    if (this.state.isSubmitted) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <PageContainer title={"Reset password"}>
        <Box>
          <H1 textAlign={"center"}>Reset your password</H1>
          <FormDescription textAlign={"center"}>
            Enter in your new password
          </FormDescription>
        </Box>
        <Formik
          enableReinitialize={true}
          initialValues={{
            password: "",
            confirmPassword: ""
          }}
          onSubmit={this.onSubmit}
          validationSchema={object().shape({
            password: string()
              .min(8, "Must be at least 8 characters")
              .required("Password is required"),
            confirmPassword: string()
              .oneOf([ref("password"), null], "Passwords don't match")
              .required("Confirm Password is required")
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
          name={"password"}
          component={FormikElements.Password}
          placeholder={"password"}
          label={"New password"}
          required={true}
          value={fp.values.password}
        />
        <ErrorMessage component={FormikElements.Error} name="password" />
        <FastField
          name={"confirmPassword"}
          component={FormikElements.Password}
          placeholder={"Confirm password"}
          label={"Confirm your password"}
          required={true}
          value={fp.values.confirmPassword}
        />
        <ErrorMessage component={FormikElements.Error} name="confirmPassword" />
        <SubmitBtn
          isLoading={fp.isSubmitting}
          disabled={fp.isSubmitting}
          buttonType={ButtonType.PRIMARY}
        >
          Reset password
        </SubmitBtn>
      </Form>
    );
  }

  private async onSubmit(values: any, actions: FormikActions<any>) {
    try {
      const authToken: string | string[] = getTokenFromQuery();
      await Auth.resetPassword(values.password, authToken);
    } catch (response) {
      if (response && response.data) {
        ToastError(response.data);
      } else {
        toast.error("There was an error while resetting your password.");
      }
    } finally {
      actions.setSubmitting(false);
      this.setState({ isSubmitted: true });
    }
  }
}

export default ResetPasswordContainer;
