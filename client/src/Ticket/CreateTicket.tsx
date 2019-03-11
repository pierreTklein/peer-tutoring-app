import { Box, Flex } from "@rebass/grid";
import { ErrorMessage, FastField, Formik, FormikProps, Field } from "formik";
import * as React from "react";
import Helmet from "react-helmet";
import { Redirect } from "react-router";
import { object, string } from "yup";

import {
  FrontendRoute,
  IAccount,
  ICourse,
  ITicket,
  REQUIRED_DESCRIPTION
} from "../config";
import {
  Button,
  H1,
  MaxWidthBox,
  ButtonType,
  FormDescription
} from "../shared/Elements";
import { Form } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import Ticket from "../api/ticket";
import { Account, Course } from "../api";

interface ICreateTicketState {
  loadingData: boolean;
  submitted: boolean;
  account: IAccount | null;
  courses: ICourse[];
}

export class CreateTicketContainer extends React.Component<
  {},
  ICreateTicketState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loadingData: true,
      submitted: false,
      account: null,
      courses: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
  }
  private async loadAccount() {
    try {
      const account = (await Account.getSelf()).data.data;
      this.setState({ account });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  }
  private async loadCourses() {
    try {
      const courses = (await Course.getAll()).data.data.courses;
      this.setState({ courses });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  }
  public async componentDidMount() {
    await Promise.all([this.loadAccount(), this.loadCourses()]);
    this.setState({ loadingData: false });
  }
  public render() {
    if (this.state.submitted) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Helmet>
          <title>Create new ticket | CSUS Helpdesk</title>
        </Helmet>
        <MaxWidthBox width={1}>
          <H1 textAlign={"center"}>Create new ticket</H1>
          <FormDescription>{REQUIRED_DESCRIPTION}</FormDescription>
          <Formik
            enableReinitialize={true}
            initialValues={{
              course: "",
              question: ""
            }}
            onSubmit={this.onSubmit}
            validationSchema={object().shape({
              course: string().required("Required"),
              question: string().required("Required")
            })}
            render={this.renderFormik}
          />
        </MaxWidthBox>
      </Flex>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <Field
          isLoading={this.state.loadingData}
          name={"course"}
          component={FormikElements.Select}
          options={this.state.courses.map(course => ({
            label: `${course.dept} ${course.code}: ${course.name}`,
            value: course.id
          }))}
          label={"What course do you need help with?"}
          required={true}
          value={fp.values.course.label}
        />
        <ErrorMessage component={FormikElements.Error} name="course" />
        <FastField
          name={"question"}
          component={FormikElements.LongTextInput}
          placeholder={"Type your question here..."}
          label={"What question do you have?"}
          maxLength={2000}
          required={true}
          value={fp.values.question}
        />
        <ErrorMessage component={FormikElements.Error} name="question" />
        <Flex justifyContent={"center"} mb={"20px"}>
          <Box>
            <Button
              onClick={fp.submitForm}
              isLoading={fp.isSubmitting}
              disabled={fp.isSubmitting || this.state.loadingData}
              buttonType={ButtonType.PRIMARY}
            >
              {this.state.loadingData ? "Loading..." : "Create ticket"}
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  }

  private async onSubmit(values: any) {
    if (!this.state.account) {
      return;
    }
    try {
      const ticket: ITicket = {
        studentId: this.state.account.id,
        courseId: values.course.value,
        question: values.question
      };
      await Ticket.create(ticket);
      this.setState({ submitted: true });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    }
  }
}

export default CreateTicketContainer;
