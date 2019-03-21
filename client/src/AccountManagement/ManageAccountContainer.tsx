import { Flex, Box } from "@rebass/grid";
import * as React from "react";
import { Redirect, RouteProps } from "react-router";

import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
  FormikActions
} from "formik";
import { Account, Auth, Course } from "../api";
import { FrontendRoute, IAccount, UserType, ICourse } from "../config";
import * as CONSTANTS from "../config/constants";
import {
  FormDescription,
  H1,
  MaxWidthBox,
  ButtonType,
  PageContainer
} from "../shared/Elements";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";

import ToastError from "../shared/Form/validationErrorGenerator";
import { getValueFromQuery, isUserType, getNestedAttr } from "../util";
import getValidationSchema from "./ValidationSchema";
import { EditTutorView } from "./EditTutorView";

export enum ManageAccountModes {
  CREATE,
  EDIT
}

interface IManageAccountContainerState {
  mode: ManageAccountModes;
  formSubmitted: boolean;
  accountDetails: IAccount;
  loaded: boolean;
  oldPassword: string;
  token?: string;
  allCourses: ICourse[];
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
      loaded: false,
      accountDetails: {
        confirmed: false,
        id: "",
        firstName: "",
        lastName: "",
        pronoun: "",
        email: getNestedAttr(props, ["location", "state", "email"]) || "",
        password: getNestedAttr(props, ["location", "state", "password"]) || "",
        accountType: [],
        tutor: {
          courses: [],
          isOnDuty: false
        }
      },
      oldPassword: "",
      allCourses: [],
      token: getValueFromQuery("token")
    };
    this.renderFormik = this.renderFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async componentDidMount() {
    const { mode } = this.state;
    if (mode === ManageAccountModes.EDIT) {
      try {
        const accountDetails = (await Account.getSelf(true)).data.data;
        const allCourses = (await Course.getAll()).data.data.courses;
        this.setState({ accountDetails, allCourses });
      } catch (e) {
        if (e && e.data) {
          ToastError(e.data);
        }
        // For some reason we could not get self. We should switch our state to CREATE.
        this.setState({ mode: ManageAccountModes.CREATE });
      }
    }
    this.setState({ loaded: true });
  }

  public render() {
    const { mode, formSubmitted, loaded } = this.state;
    if (!formSubmitted) {
      const { accountDetails, allCourses } = this.state;
      const title = `${
        mode === ManageAccountModes.CREATE ? "Create" : "Edit"
      } Your Account`;
      return (
        <React.Fragment>
          <MaxWidthBox width={0.9} m={"auto"}>
            {isUserType(accountDetails, UserType.TUTOR) && (
              <EditTutorView account={accountDetails} courses={allCourses} />
            )}
          </MaxWidthBox>
          <PageContainer title={title} loading={!loaded}>
            <Box>
              <H1 textAlign={"center"}>{title}</H1>
              <FormDescription>
                {CONSTANTS.REQUIRED_DESCRIPTION}
              </FormDescription>
            </Box>
            <Formik
              enableReinitialize={true}
              initialValues={{
                firstName: accountDetails.firstName,
                lastName: accountDetails.lastName,
                pronoun: accountDetails.pronoun || "",
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
          </PageContainer>
        </React.Fragment>
      );
    }
    return <Redirect to={FrontendRoute.HOME_PAGE} />;
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
          name={"pronoun"}
          inputType={"text"}
          label={CONSTANTS.PRONOUN_LABEL}
          value={fp.values.pronoun}
          component={FormikElements.Input}
          placeholder={"Your preferred pronoun"}
        />
        <ErrorMessage component={FormikElements.Error} name="pronoun" />
        <FastField
          name={"email"}
          inputType={"email"}
          label={CONSTANTS.EMAIL_LABEL}
          value={fp.values.email}
          component={FormikElements.Email}
          isDisabled={mode === ManageAccountModes.EDIT}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="email" />
        <FastField
          component={FormikElements.Password}
          inputType={"password"}
          label={
            mode === ManageAccountModes.CREATE
              ? CONSTANTS.PASSWORD_LABEL
              : CONSTANTS.OLD_PASSWORD_LABEL
          }
          name={"password"}
          required={mode === ManageAccountModes.CREATE}
          value={fp.values.password}
        />
        <ErrorMessage component={FormikElements.Error} name="password" />
        {mode === ManageAccountModes.EDIT && (
          <MaxWidthBox>
            <FastField
              label={CONSTANTS.NEW_PASSWORD_LABEL}
              component={FormikElements.Password}
              inputType={"password"}
              name={"newPassword"}
            />
            <ErrorMessage component={FormikElements.Error} name="newPassword" />
          </MaxWidthBox>
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

  private handleSubmit(values: FormikValues, actions: FormikActions<any>) {
    const { mode, accountDetails } = this.state;

    const formattedDetails = this.convertFormikToAccount(
      values,
      accountDetails.id
    );
    switch (mode) {
      case ManageAccountModes.CREATE:
        this.handleCreate(formattedDetails, actions);
        break;
      case ManageAccountModes.EDIT:
        this.handleEdit(
          formattedDetails,
          actions,
          values.password,
          values.newPassword
        );
        break;
    }
  }

  private async handleCreate(payload: IAccount, actions: FormikActions<any>) {
    try {
      await Account.create(payload, this.state.token);
      await Auth.login(payload.email, payload.password);
      this.setState({ formSubmitted: true });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  private async handleEdit(
    payload: IAccount,
    actions: FormikActions<any>,
    oldPassword?: string,
    newPassword?: string
  ) {
    try {
      await Account.updateSelf(payload);
      if (oldPassword && newPassword) {
        await Auth.changePassword(oldPassword, newPassword);
      }
      this.setState({ formSubmitted: true });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    } finally {
      actions.setSubmitting(false);
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
      confirmed: false,
      accountType: [UserType.STUDENT],
      email: values.email,
      firstName: values.firstName,
      pronoun: values.pronoun,
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
