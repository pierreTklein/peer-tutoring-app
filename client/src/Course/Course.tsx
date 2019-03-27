import * as React from "react";
import { ICourse } from "../config";
import { Panel, H2 } from "../shared";
import { Box } from "@rebass/grid";
import LabelledField from "../shared/Elements/LabelledField";

interface ICourseProps {
  course: ICourse;
}

export const Course: React.FunctionComponent<ICourseProps> = ({ course }) => {
  return (
    <Panel flexDirection={"column"} m={"2%"} p={"15px"}>
      <Box>
        <H2 marginBottom={"0px"}>
          {course.dept} {course.code}: {course.name}
        </H2>
      </Box>
    </Panel>
  );
};
