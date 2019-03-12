import { Box, Flex } from "@rebass/grid";
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  Field,
  FormikActions
} from "formik";
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
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import Ticket from "../api/ticket";
import { Account, Course } from "../api";
import { getOptionsFromEnum } from "../util";
import { QuestionCategory } from "../config/QuestionCategory";

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
        <MaxWidthBox width={0.9} m={"auto"}>
          <H1 textAlign={"center"}>Create new ticket</H1>
          <FormDescription>{REQUIRED_DESCRIPTION}</FormDescription>
          <Formik
            enableReinitialize={true}
            initialValues={{
              course: "",
              question: "",
              category: ""
            }}
            onSubmit={this.onSubmit}
            validationSchema={object().shape({
              course: string().required("Required"),
              question: string().required("Required"),
              category: string().required("Required")
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
          value={fp.values.course}
        />
        <ErrorMessage component={FormikElements.Error} name="course" />
        <FastField
          name={"category"}
          component={FormikElements.Select}
          placeholder={"Assignment, Review, etc."}
          label={"What is your question about?"}
          creatable={true}
          options={getOptionsFromEnum(QuestionCategory)}
          required={true}
          value={fp.values.category}
        />
        <ErrorMessage component={FormikElements.Error} name="category" />
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
        <SubmitBtn
          isLoading={fp.isSubmitting}
          disabled={fp.isSubmitting}
          buttonType={ButtonType.PRIMARY}
        >
          {this.state.loadingData ? "Loading..." : "Create ticket"}
        </SubmitBtn>
      </Form>
    );
  }

  private async onSubmit(values: any, actions: FormikActions<any>) {
    if (!this.state.account) {
      return;
    }
    try {
      const ticket: ITicket = {
        studentId: this.state.account.id,
        courseId: values.course.value,
        question: values.question,
        category: values.category.value
      };
      await Ticket.create(ticket);
      this.setState({ submitted: true });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    } finally {
      actions.setSubmitting(false);
    }
  }
}

export default CreateTicketContainer;
