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

export interface IInviteContainerState {
  submitting: boolean;
  success: boolean;
}

export class InviteContainer extends React.Component<
  {},
  IInviteContainerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      submitting: false,
      success: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
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
          render={arrayHelpers => (
            <Flex flexWrap={"wrap"} width={1}>
              {invites &&
                invites.map((invite: IInviteInfo, index: number) => (
                  <React.Fragment key={index}>
                    <MaxWidthBox
                      width={[0.15, 0.1]}
                      mt={"29px"}
                      pr={[0, "10px"]}
                    >
                      <Button
                        type="button"
                        isNarrow={true}
                        buttonType={ButtonType.DANGER}
                        disabled={index === 0}
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        –
                      </Button>
                    </MaxWidthBox>
                    <MaxWidthBox width={[0.85, 0.45]}>
                      <FastField
                        name={`invites.${index}.email`}
                        label={"Email Address"}
                        placeholder={"Email..."}
                        value={invite.email}
                        component={FormikElements.Email}
                        location={InputLocation.LEFT}
                        required={true}
                      />
                      <ErrorMessage
                        component={FormikElements.Error}
                        name={`invites.${index}.email`}
                      />
                    </MaxWidthBox>
                    <MaxWidthBox width={[1, 0.45]}>
                      <FastField
                        name={`invites.${index}.accountType`}
                        label={"Account Type"}
                        value={invite.accountType}
                        component={FormikElements.Select}
                        location={InputLocation.RIGHT}
                        options={getOptionsFromEnum(UserType)}
                        isMulti={true}
                        required={true}
                      />
                      <ErrorMessage
                        component={FormikElements.Error}
                        name={`invites.${index}.accountType`}
                      />
                    </MaxWidthBox>
                  </React.Fragment>
                ))}
              <Flex width={1} justifyContent={"center"}>
                <Box>
                  <Button
                    type="button"
                    buttonType={ButtonType.SECONDARY}
                    disabled={fp.isSubmitting}
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
                    disabled={fp.isSubmitting}
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
        />
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

  private readFileFactory(arrayHelpers: FieldArrayRenderProps, arrLen: number) {
    return (file: File) => {
      const fr = new FileReader();
      fr.readAsText(file);
      fr.onloadend = () => {
        const rows: string[] = String(fr.result)
          .split("\n")
          .sort();
        const deduped = _.uniq(rows);
        deduped.forEach(row => {
          const cols = row.split(",");
          if (!(cols[0] === "email" || cols[1] === "accountType")) {
            // all rows except header
            const email = cols[0];
            const accountType =
              cols[1] && cols[1] !== ""
                ? (cols[1] as UserType)
                : UserType.TUTOR;
            arrayHelpers.insert(arrLen - 1, {
              email,
              accountType: [{ label: accountType, value: accountType }]
            });
          }
        });
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
        invites.map(async invite => {
          return await Account.invite(invite);
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
