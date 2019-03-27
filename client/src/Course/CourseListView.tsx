import { Flex } from "@rebass/grid";
import * as React from "react";

import { ICourse } from "../config";
import { Course } from "./Course";
import { MaxHeightFlex } from "../shared";

interface ICourseListViewProps {
  courses: ICourse[];
}

const CourseListView: React.FunctionComponent<ICourseListViewProps> = ({
  courses
}) => {
  return (
    <MaxHeightFlex flexDirection={"column"} roundedBorder={true}>
      {courses.map((course, i) => (
        <Course key={i} course={course} />
      ))}
    </MaxHeightFlex>
  );
};

export default CourseListView;
