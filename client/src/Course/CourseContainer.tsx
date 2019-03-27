import * as React from "react";

import { ICourse } from "../config";

import { Course } from "../api";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import WithToasterContainer from "../shared/HOC/withToaster";
import { PageContainer, H1 } from "../shared";
import CourseListView from "./CourseListView";

export interface ICourseContainerState {
  loading: boolean;
  courses: ICourse[];
}

/**
 * Container that renders form to log in.
 */
class CourseContainer extends React.Component<{}, ICourseContainerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      courses: []
    };
  }

  public async componentDidMount() {
    // set hacker status
    try {
      const courses = (await Course.getAll()).data.data.courses;
      this.setState({ courses });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    } finally {
      this.setState({ loading: false });
    }
  }
  public render() {
    const { loading, courses } = this.state;
    return (
      <PageContainer title={"Courses"} loading={loading}>
        <H1 marginLeft={"0px"} textAlign={"center"}>
          Course List
        </H1>
        <CourseListView courses={courses} />
      </PageContainer>
    );
  }
}
export default WithToasterContainer(CourseContainer);
