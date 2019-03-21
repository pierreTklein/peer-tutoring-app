import { Box, Flex } from "@rebass/grid";
import * as React from "react";

import { ITicketStats } from "../config";
import { H1, PageContainer, Panel, H2 } from "../shared/Elements";
import ToastError from "../shared/Form/validationErrorGenerator";
import { Ticket } from "../api";
import { FootTraffic, FootTrafficView } from "./FootTraffic";
import { dayOfWeekAsString, hourAsString } from "../util";
import OverviewStatsView from "./OverviewView";
import GraphView from "./GraphView";

export interface ILoginState {
  loadingData: boolean;
  data: ITicketStats;
}

export class StatsContainer extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loadingData: true,
      data: {
        total: 0,
        avgWait: 0,
        avgAbandon: 0,
        freqHour: [],
        freqDay: [],
        freqStudents: {},
        freqTutors: {},
        freqCourses: {}
      }
    };
  }
  public async componentDidMount() {
    try {
      const data = (await Ticket.stats({})).data.data;
      this.setState({ data });
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    } finally {
      this.setState({ loadingData: false });
    }
  }

  public render() {
    const { data, loadingData } = this.state;
    return (
      <PageContainer
        title={"Service Statistics"}
        maxWidth={"1260px"}
        loading={loadingData}
      >
        <H1 textAlign={"center"}>Service Statistics</H1>
        <Box width={1}>
          <OverviewStatsView data={data} />
        </Box>
        <Box width={1}>
          <GraphView data={data} view={FootTrafficView.COURSE} />
        </Box>
        <Box width={1}>
          <GraphView data={data} view={FootTrafficView.CATEGORY} />
        </Box>
      </PageContainer>
    );
  }
}

export default StatsContainer;
