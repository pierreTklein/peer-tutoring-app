import { Box, Flex } from "@rebass/grid";
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikActions,
  FieldArray,
  Field,
  FieldArrayRenderProps
} from "formik";
import * as QueryString from "query-string";
import * as React from "react";
import { Redirect } from "react-router";
import { object, string, array } from "yup";

import { FrontendRoute, IInviteInfo, UserType } from "../config";
import {
  Button,
  ButtonType,
  H1,
  PageContainer,
  MaxWidthBox
} from "../shared/Elements";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import { Auth, Account } from "../api";
import { Link } from "react-router-dom";
import ToastError from "../shared/Form/validationErrorGenerator";
import { toast } from "react-toastify";
import { getOptionsFromEnum } from "../util";
import { InputLocation, ReadFileBtn } from "../shared";
import _ from "lodash";
import MediaQuery from "react-responsive";
import ProgressBar from "../shared/Elements/ProgressBar";
import { InviteRow } from "./InviteRow";

export interface IInviteContainerState {
  uploadingCSV: boolean;
  submitting: boolean;
  success: boolean;
  loadingPercent: number;
}

export class InviteContainer extends React.Component<
  {},
  IInviteContainerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      uploadingCSV: false,
      submitting: false,
      success: false,
      loadingPercent: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
    this.renderFieldArray = this.renderFieldArray.bind(this);
  }
  public render() {
    if (this.state.success && !this.state.submitting) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <PageContainer title={"Invite Users"}>
        <H1 textAlign={"center"}>Invite Users</H1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            invites: [{ email: "", accountType: [] }]
          }}
          onSubmit={this.onSubmit}
          validationSchema={object().shape({
            invites: array()
              .of(
                object().shape({
                  email: string()
                    .required("Required")
                    .email("Must be a valid email"),
                  accountType: array()
                    .required("Required")
                    .min(1, "Select an account type")
                })
              )
              .required("Must have one invite")
              .min(1, "Minimum of one invite")
          })}
          render={this.renderFormik}
        />
      </PageContainer>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    const invites = fp.values.invites;
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FieldArray
          name="invites"
          render={arrayHelpers => this.renderFieldArray(arrayHelpers, invites)}
        />
        <SubmitBtn
          isLoading={fp.isSubmitting || this.state.submitting}
          disabled={fp.isSubmitting || this.state.submitting}
          buttonType={ButtonType.PRIMARY}
        >
          Submit
        </SubmitBtn>
        {(this.state.uploadingCSV || this.state.submitting) && (
          <Flex>
            <ProgressBar percentage={this.state.loadingPercent} />
          </Flex>
        )}
      </Form>
    );
  }

  private renderFieldArray(
    arrayHelpers: FieldArrayRenderProps,
    invites: IInviteInfo[]
  ) {
    return (
      <MediaQuery minDeviceWidth={700}>
        {matches => (
          <Flex flexWrap={"wrap"} width={1}>
            {invites &&
              invites.map((invite: IInviteInfo, index: number) => (
                <InviteRow
                  key={index}
                  invite={invite}
                  index={index}
                  isLargeView={matches}
                  onRemoveRow={() => arrayHelpers.remove(index)}
                />
              ))}
            <Flex width={1} justifyContent={"center"}>
              <Box>
                <Button
                  type="button"
                  buttonType={ButtonType.SECONDARY}
                  disabled={this.state.submitting}
                  onClick={() =>
                    arrayHelpers.push({ email: "", accountType: [] })
                  }
                >
                  Add row
                </Button>
              </Box>
              <Box>
                <ReadFileBtn
                  buttonType={ButtonType.SECONDARY}
                  isLoading={this.state.uploadingCSV}
                  disabled={this.state.submitting || this.state.uploadingCSV}
                  onFileUploaded={this.readFileFactory(
                    arrayHelpers,
                    invites.length
                  )}
                >
                  Add by CSV
                </ReadFileBtn>
              </Box>
            </Flex>
          </Flex>
        )}
      </MediaQuery>
    );
  }

  private readFileFactory(arrayHelpers: FieldArrayRenderProps, arrLen: number) {
    return async (file: File) => {
      this.setState({ uploadingCSV: true });
      const fr = new FileReader();
      fr.readAsText(file);
      fr.onloadend = () => {
        const rows: string[] = (fr.result as String).split("\n").sort();
        const deduped = _.uniq(rows);
        deduped.forEach((row, index) => {
          const cols = row.split(",");
          if (!(cols[0] === "email" || cols[1] === "accountType")) {
            // all rows except header
            const email = cols[0];
            const accountType =
              cols[1] && cols[1] !== ""
                ? (cols[1] as UserType)
                : UserType.TUTOR;
            arrayHelpers.push({
              email,
              accountType: [{ label: accountType, value: accountType }]
            });
          }
        });
        this.setState({ uploadingCSV: false });
      };
    };
  }

  private async onSubmit(
    values: {
      invites: Array<{
        email: string;
        accountType: Array<{ label: UserType; value: UserType }>;
      }>;
    },
    actions: FormikActions<any>
  ) {
    const invites: IInviteInfo[] = values.invites.map(value => {
      const accounts = value.accountType.map(at => at.value);
      return { email: value.email, accountType: accounts };
    });
    this.setState({ submitting: true });
    try {
      await Promise.all(
        invites.map(async (invite, index) => {
          const result = await Account.invite(invite);
          this.setState({ loadingPercent: (index / invites.length) * 100 });
          return result;
        })
      );
      this.setState({ success: true });
    } catch (response) {
      if (response && response.data) {
        ToastError(response.data);
      } else {
        toast.error("There was an error while inviting the users.");
      }
    } finally {
      actions.setSubmitting(false);
      this.setState({ submitting: false });
    }
  }
}

export default InviteContainer;
