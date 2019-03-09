import * as React from "react";
import { ITutor, ICourse } from "../config";
import { H2, Section, Pillbox } from "../shared";
import { Box, Flex } from "@rebass/grid";
import LabelledField from "../shared/Elements/LabelledField";

interface ITutorProps {
  tutor: ITutor;
}

export const Tutor: React.FunctionComponent<ITutorProps> = ({ tutor }) => {
  const onDuty = tutor.isOnDuty ? "Yes" : "No";
  return (
    <Section title={"Tutor Information"}>
      <Flex flexDirection={"column"}>
        <LabelledField label={"Is on duty"} text={onDuty} />
        <Box>
          <Flex flexWrap={"wrap"}>
            <Box>
              <strong>Courses</strong>:
            </Box>
            {parseCourses(tutor.courses)}
          </Flex>
        </Box>
      </Flex>
    </Section>
  );
};
function parseCourses(courses: string[] | ICourse[]) {
  if (courses.length === 0) {
    return [];
  } else if (typeof courses[0] === "string") {
    courses = courses as string[];
    return courses.map((course, index) => (
      <Pillbox key={index}>{course}</Pillbox>
    ));
  } else {
    courses = courses as ICourse[];
    return courses.map((course, index) => (
      <Pillbox key={index} px={"3px"} mx={"2px"}>
        {course.dept} {course.code}
      </Pillbox>
    ));
  }
}
