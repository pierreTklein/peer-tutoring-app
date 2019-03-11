import { Flex } from "@rebass/grid";
import { ErrorMessage, Formik, FormikProps, Field, FastField } from "formik";
import * as React from "react";
import { Redirect } from "react-router";
import { object, array } from "yup";

import {
  FrontendRoute,
  IAccount,
  ICourse,
  REQUIRED_DESCRIPTION,
  ITutor
} from "../config";
import {
  H1,
  MaxWidthBox,
  ButtonType,
  FormDescription
} from "../shared/Elements";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { Tutor } from "../api";

interface IEditTutorProps {
  account: IAccount;
  courses: ICourse[];
}

interface IEditTutorState {
  submitted: boolean;
}

export class EditTutorView extends React.Component<
  IEditTutorProps,
  IEditTutorState
> {
  constructor(props: IEditTutorProps) {
    super(props);
    this.state = {
      submitted: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
    this.labelValueToLabel = this.labelValueToLabel.bind(this);
    this.labelValueToValue = this.labelValueToValue.bind(this);
    this.courseToLabelValue = this.courseToLabelValue.bind(this);
  }
  public render() {
    let courses = this.props.account.tutor.courses;
    console.log(courses);
    let kvp = [];
    if (courses.length > 0 && typeof courses[0] === "string") {
      courses = courses as string[];
      kvp = courses.map(this.courseToLabelValue);
    } else {
      courses = courses as ICourse[];
      kvp = courses.map(this.courseToLabelValue);
      console.log(kvp);
    }
    if (this.state.submitted) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <MaxWidthBox width={1}>
          <H1 textAlign={"center"}>Update Tutor Info</H1>
          <FormDescription>{REQUIRED_DESCRIPTION}</FormDescription>
          <Formik
            enableReinitialize={true}
            initialValues={{
              courses: kvp
            }}
            onSubmit={this.onSubmit}
            validationSchema={object().shape({
              courses: array().required("Required")
            })}
            render={this.renderFormik}
          />
        </MaxWidthBox>
      </Flex>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    const { courses } = this.props;
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          name={"courses"}
          component={FormikElements.Select}
          options={courses.map(this.courseToLabelValue)}
          label={"What courses do you feel comfortable tutoring?"}
          isMulti={true}
          required={true}
          value={fp.values.courses}
        />
        <ErrorMessage component={FormikElements.Error} name="courses" />
        <SubmitBtn
          onClick={fp.submitForm}
          isLoading={fp.isSubmitting}
          disabled={fp.isSubmitting}
          buttonType={ButtonType.PRIMARY}
        >
          Update info
        </SubmitBtn>
      </Form>
    );
  }

  private courseToLabelValue(course: ICourse | string) {
    const lvPair = {
      label: course,
      value: course
    };
    if (typeof course !== "string") {
      lvPair.label = `${course.dept} ${course.code}`;
      lvPair.value = course.id || course._id || "";
    }
    return lvPair;
  }
  private labelValueToLabel(lv: { label: string; value: string }) {
    return lv.label;
  }
  private labelValueToValue(lv: { label: string; value: string }) {
    return lv.value;
  }

  private async onSubmit(values: any) {
    const { account } = this.props;
    try {
      const tutorData: ITutor = account.tutor;
      tutorData.courses = values.courses.map(this.labelValueToValue);
      console.log(values.courses);
      await Tutor.patchSelf(tutorData);
      this.setState({ submitted: true });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    }
  }
}

export default EditTutorView;
