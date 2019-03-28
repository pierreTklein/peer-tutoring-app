import { Box, Flex } from "@rebass/grid";
import * as React from "react";

import { ITicketStats } from "../config";
import { Panel, H2 } from "../shared/Elements";
import { FootTrafficView, FootTraffic } from "./FootTraffic";
import { dayOfWeekAsString, hourAsString } from "../util";

export interface IGraphViewProps {
  data: ITicketStats;
  view: FootTrafficView;
}

export const GraphView: React.FunctionComponent<IGraphViewProps> = ({
  data,
  view
}) => {
  return (
    <Panel width={1} flexDirection={"column"} mt={"20px"} p={"15px"}>
      <H2>{view}:</H2>
      <Flex width={1} alignItems={"center"} flexWrap={"wrap"}>
        <Box width={[1, 1, 1 / 2]} p={"10px"}>
          <FootTraffic
            data={data.freqDay}
            title={"Foot traffic per week"}
            syncId="week_data"
            xLabel={"Day"}
            view={view}
            indexToName={dayOfWeekAsString}
          />
        </Box>
        <Box width={[1, 1, 1 / 2]} p={"10px"}>
          <FootTraffic
            data={data.freqHour}
            title={"Foot traffic per hour"}
            indexToName={hourAsString}
            view={view}
            syncId="hour_data"
            xLabel={"Hour"}
          />
        </Box>
      </Flex>
    </Panel>
  );
};

export default GraphView;
