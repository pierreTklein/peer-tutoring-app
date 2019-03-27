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
          <NumberStat title={"Total"} data={data.total} />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Max. Wait"}
            data={data.maxWait / 1000 / 60}
            dataUnit={"min"}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Min. Wait"}
            data={data.minWait / 1000 / 60}
            dataUnit={"min"}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Avg. Wait"}
            data={data.avgWait / 1000 / 60}
            dataUnit={"min"}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat
            title={"Avg. Session"}
            data={data.avgSessionTime / 1000 / 60}
            dataUnit={"min"}
          />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Waiting"} data={data.totalCurWaiting} />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Yielded"} data={data.totalAbandon} />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Ended"} data={data.totalComplete} />
        </Box>
        <Box p={"10px"}>
          <NumberStat title={"Not Helped"} data={data.totalNoTutor} />
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
