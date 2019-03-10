import { Flex } from "@rebass/grid";
import * as React from "react";
import Helmet from "react-helmet";
import { Redirect, RouteProps } from "react-router";

import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues
} from "formik";
import { Account, Auth } from "../api";
import { FrontendRoute, IAccount, UserType } from "../config";
import * as CONSTANTS from "../config/constants";
import {
  FormDescription,
  H1,
  MaxWidthBox,
  Button,
  ButtonType
} from "../shared/Elements";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";

import ToastError from "../shared/Form/validationErrorGenerator";
import { getValueFromQuery } from "../util";
import getValidationSchema from "./ValidationSchema";

export enum ManageAccountModes {
  CREATE,
  EDIT
}

interface IManageAccountContainerState {
  mode: ManageAccountModes;
  formSubmitted: boolean;
  accountDetails: IAccount;
  oldPassword: string;
  token?: string;
}

interface IManageAccountContainerProps extends RouteProps {
  mode: ManageAccountModes;
}

class ManageAccountContainer extends React.Component<
  IManageAccountContainerProps,
  IManageAccountContainerState
> {
  constructor(props: IManageAccountContainerProps) {
    super(props);
    this.state = {
      formSubmitted: false,
      mode: props.mode,
      accountDetails: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accountType: [],
        tutor: {
          courses: [],
          isOnDuty: false
        }
      },
      oldPassword: "",
      token: getValueFromQuery("token")
    };
    this.renderFormik = this.renderFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async componentDidMount() {
    const { mode } = this.state;
    if (mode === ManageAccountModes.EDIT) {
      try {
        const accountDetails = (await Account.getSelf()).data.data;
        this.setState({ accountDetails });
      } catch (e) {
        if (e && e.data) {
          ToastError(e.data);
        }
        // For some reason we could not get self. We should switch our state to CREATE.
        this.setState({ mode: ManageAccountModes.CREATE });
      }
    }
  }

  public render() {
    const { mode, formSubmitted, token } = this.state;

    if (!formSubmitted) {
      return this.renderForm();
    }

    switch (mode) {
      case ManageAccountModes.CREATE:
        return <Redirect to={FrontendRoute.HOME_PAGE} />;

      case ManageAccountModes.EDIT:
        return <Redirect to={FrontendRoute.HOME_PAGE} />;

      default:
        return this.renderForm();
    }
  }

  private renderForm() {
    const { mode, accountDetails } = this.state;
    return (
      <MaxWidthBox width={0.9} m={"auto"}>
        <Helmet>
          <title>
            {mode === ManageAccountModes.CREATE ? "Create" : "Edit"} Account |
            CSUS Helpdesk
          </title>
        </Helmet>
        <H1 textAlign={"center"}>
          {mode === ManageAccountModes.CREATE ? "Create" : "Edit"} your Account
        </H1>
        <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName: accountDetails.firstName,
            lastName: accountDetails.lastName,
            email: accountDetails.email,
            password: accountDetails.password || "",
            newPassword: ""
          }}
          onSubmit={this.handleSubmit}
          render={this.renderFormik}
          validationSchema={getValidationSchema(
            mode === ManageAccountModes.CREATE
          )}
        />
      </MaxWidthBox>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    const { mode } = this.state;
    return (
      <Form onSubmit={fp.handleSubmit}>
        <Flex flexWrap={"wrap"} width={1} m="auto">
          <MaxWidthBox width={[1, 0.5]} pr={[0, "10px"]}>
            <FastField
              name={"firstName"}
              label={CONSTANTS.FIRST_NAME_LABEL}
              value={fp.values.firstName}
              component={FormikElements.Input}
              isTight={true}
              required={true}
            />
            <ErrorMessage component={FormikElements.Error} name="firstName" />
          </MaxWidthBox>
          <MaxWidthBox width={[1, 0.5]} pl={[0, "10px"]}>
            <FastField
              name={"lastName"}
              label={CONSTANTS.LAST_NAME_LABEL}
              value={fp.values.lastName}
              component={FormikElements.Input}
              isTight={true}
              required={true}
            />
            <ErrorMessage component={FormikElements.Error} name="lastName" />
          </MaxWidthBox>
        </Flex>
        <FastField
          name={"email"}
          label={CONSTANTS.EMAIL_LABEL}
          value={fp.values.email}
          component={FormikElements.Input}
          isDisabled={mode === ManageAccountModes.EDIT}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="email" />
        <FastField
          component={FormikElements.Input}
          inputType={"password"}
          label={CONSTANTS.PASSWORD_LABEL}
          name={"password"}
          required={mode === ManageAccountModes.CREATE}
          value={fp.values.password}
        />
        <ErrorMessage component={FormikElements.Error} name="password" />
        {mode === ManageAccountModes.EDIT ? (
          <MaxWidthBox>
            <FastField
              label={CONSTANTS.NEW_PASSWORD_LABEL}
              component={FormikElements.Input}
              inputType={"password"}
              name={"newPassword"}
            />
            <ErrorMessage component={FormikElements.Error} name="newPassword" />
          </MaxWidthBox>
        ) : (
          ""
        )}
        <SubmitBtn
          isLoading={fp.isSubmitting}
          disabled={fp.isSubmitting}
          buttonType={ButtonType.PRIMARY}
        >
          Submit
        </SubmitBtn>
      </Form>
    );
  }

  private handleSubmit(values: FormikValues) {
    const { mode, accountDetails } = this.state;

    const formattedDetails = this.convertFormikToAccount(
      values,
      accountDetails.id
    );

    switch (mode) {
      case ManageAccountModes.CREATE:
        this.handleCreate(formattedDetails);
        break;
      case ManageAccountModes.EDIT:
        this.handleEdit(formattedDetails, values.password, values.newPassword);
        break;
    }
  }

  private async handleCreate(payload: IAccount) {
    try {
      await Account.create(payload, this.state.token);
      await Auth.login(payload.email, payload.password);
      this.setState({ formSubmitted: true });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    }
  }

  private async handleEdit(
    payload: IAccount,
    oldPassword?: string,
    newPassword?: string
  ) {
    try {
      await Account.update(payload);
      if (oldPassword && newPassword) {
        await Auth.changePassword(oldPassword, newPassword);
      }
      this.setState({ formSubmitted: true });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    }
  }
  /**
   * This converts the formik values object into the IAccount object.
   * @param values Formik values
   * @param accountId the account id associated with this user.
   */
  private convertFormikToAccount(
    values: FormikValues,
    accountId: string = ""
  ): IAccount {
    return {
      accountType: [UserType.STUDENT],
      email: values.email,
      firstName: values.firstName,
      id: accountId,
      lastName: values.lastName,
      password: values.password,
      // this is just to satisfy IAccount properties, but is not read by API
      tutor: {
        courses: [],
        isOnDuty: false
      }
    };
  }
}

export default ManageAccountContainer;
