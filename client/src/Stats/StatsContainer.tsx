import { Box } from "@rebass/grid";
import * as React from "react";

import { ITicketStats } from "../config";
import { H1, PageContainer, StyledModal } from "../shared/Elements";
import ToastError from "../shared/Form/validationErrorGenerator";
import { Ticket } from "../api";
import { FootTrafficView } from "./FootTraffic";
import OverviewView from "./OverviewView";
import GraphView from "./GraphView";
import FilterComponent from "./FilterComponent";
import { ITicketQuery } from "../config/ITicketQuery";
import { PieChartContainer } from "./PieChartContainer";
import { dictToArray } from "../util";

export interface ILoginState {
  loadingData: boolean;
  data: ITicketStats;
  isModalOpen: boolean;
  modalTitle: string;
  modalData: object;
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
      },
      isModalOpen: false,
      modalTitle: "",
      modalData: {}
    };
    this.onFetchStats = this.onFetchStats.bind(this);
  }
  public async componentDidMount() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    await this.onFetchStats({
      createBefore: tomorrow,
      createAfter: oneWeekAgo
    });
  }

  public async onFetchStats(query: ITicketQuery) {
    try {
      const data = (await Ticket.stats(query)).data.data;
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
    const {
      data,
      loadingData,
      isModalOpen,
      modalTitle,
      modalData
    } = this.state;
    const title = "Service Statistics";
    return (
      <PageContainer
        title={title}
        maxWidth={"1260px"}
        loading={loadingData}
        backgroundColor={"aliceblue"}
      >
        <StyledModal
          appElement={document.getElementById("root") || undefined}
          isOpen={isModalOpen}
          contentLabel={modalTitle}
          onRequestClose={() => this.setState({ isModalOpen: false })}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          height={"345px"}
        >
          <PieChartContainer title={modalTitle} data={dictToArray(modalData)} />
        </StyledModal>
        <H1 textAlign={"center"}>{title}</H1>
        <Box width={1}>
          <FilterComponent onSubmit={this.onFetchStats} />
        </Box>
        <Box width={1}>
          <OverviewView
            data={data}
            onDataClicked={(title, data) =>
              this.setState({
                modalTitle: title,
                modalData: data,
                isModalOpen: true
              })
            }
          />
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
