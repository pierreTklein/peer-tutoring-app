import { Box, Flex } from "@rebass/grid";
import * as React from "react";

import { ITicketStats } from "../config";
import { Panel, H2 } from "../shared/Elements";
import { NumberStat } from "./NumberStat";

export interface IOverviewViewProps {
  data: ITicketStats;
  onDataClicked?: (title: string, data: object) => void;
}

export const OverviewView: React.FunctionComponent<IOverviewViewProps> = ({
  data,
  onDataClicked = () => null
}) => {
  return (
    <Panel width={1} flexDirection={"column"} p={"15px"}>
      <H2>Overview:</H2>
      <Flex justifyContent={"center"} flexWrap={"wrap"}>
        <Box p={"10px"}>
          <NumberStat title={"Total Questions"} data={data.total} />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Avg. Wait Time"}
            data={data.avgWait / 1000 / 60}
            dataUnit={"min"}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Avg. Session Time"}
            data={data.avgSessionTime / 1000 / 60}
            dataUnit={"min"}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Avg. Abandons"} data={data.avgAbandon} />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Total Ended"} data={data.totalComplete} />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Total No Tutor"} data={data.totalNoTutor} />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Unique Students"}
            data={Object.keys(data.freqStudents).length}
            onClick={() => onDataClicked("Students", data.freqStudents)}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Unique Tutors"}
            data={Object.keys(data.freqTutors).length}
            onClick={() => onDataClicked("Tutors", data.freqTutors)}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Unique Courses"}
            data={Object.keys(data.freqCourses).length}
            onClick={() => onDataClicked("Courses", data.freqCourses)}
          />
        </Box>
      </Flex>
    </Panel>
  );
};

export default OverviewView;
