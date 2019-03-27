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
import { dictToArray, getValueFromQuery } from "../util";

export interface ILoginState {
  loadingData: boolean;
  data: ITicketStats;
  isModalOpen: boolean;
  modalTitle: string;
  modalData: object;
  query: ITicketQuery;
}

export class StatsContainer extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loadingData: true,
      data: {
        total: 0,
        minWait: 0,
        maxWait: 0,
        avgWait: 0,
        totalAbandon: 0,
        totalComplete: 0,
        avgSessionTime: 0,
        totalNoTutor: 0,
        totalNotEnded: 0,
        totalCurWaiting: 0,
        freqHour: [],
        freqDay: [],
        freqStudents: {},
        freqTutors: {},
        freqCourses: {}
      },
      isModalOpen: false,
      modalTitle: "",
      modalData: {},
      query: this.getQuery()
    };
    this.updateQueryURL = this.updateQueryURL.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.onFetchStats = this.onFetchStats.bind(this);
  }
  public async componentDidMount() {
    await this.onFetchStats(this.state.query);
  }

  public async onFetchStats(query: ITicketQuery) {
    this.updateQueryURL(query);
    this.setState({ query, loadingData: true });
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
    const { data, isModalOpen, modalTitle, modalData } = this.state;
    const title = "Service Statistics";
    return (
      <PageContainer
        title={title}
        maxWidth={"1200px"}
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
          <FilterComponent
            onSubmit={this.onFetchStats}
            query={this.state.query}
            isLoading={this.state.loadingData}
          />
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

  private getQuery(): ITicketQuery {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const cbString = getValueFromQuery("createBefore") || tomorrow;
    const caString = getValueFromQuery("createAfter") || oneWeekAgo;
    const endedStr = getValueFromQuery("ended");
    const assignStr = getValueFromQuery("assigned");
    const query = {
      createBefore: new Date(cbString),
      createAfter: new Date(caString),
      ended: endedStr ? endedStr === "true" : undefined,
      assigned: assignStr ? assignStr === "true" : undefined,
      tutorId: getValueFromQuery("tutorId"),
      studentId: getValueFromQuery("studentId"),
      courseId: getValueFromQuery("courseId")
    };
    return query;
  }
  private updateQueryURL(query: ITicketQuery) {
    let qParams = "?";
    dictToArray(query).forEach((q, i) => {
      if (q.value instanceof Date) {
        q.value = q.value.toJSON();
      }
      if (q.value !== undefined) {
        qParams += `${i > 0 ? "&" : ""}${q.key}=${q.value}`;
      }
    });
    window.history.replaceState(
      null,
      "",
      window.location.href.split("?")[0] + qParams
    );
  }
}

export default StatsContainer;
