import * as React from "react";

import { Flex, Box } from "@rebass/grid";
import { MaxWidthBox, Panel, H1 } from "./";
import { Helmet } from "react-helmet";
import { SocketConn, ITicketUpdateEvent, EventType } from "../../api";
import { toast } from "react-toastify";
import {
  playNotification,
  desktopNotification
} from "../../util/notifications";

interface IPageContainerProps {
  title: string;
  loading?: boolean;
  maxWidth?: string | number;
  backgroundColor?: string;
}

interface IPageContainerState {
  notification: boolean;
}

export class PageContainer extends React.Component<
  IPageContainerProps,
  IPageContainerState
> {
  constructor(props: IPageContainerProps) {
    super(props);
    this.state = {
      notification: false
    };
    this.onServerNotification = this.onServerNotification.bind(this);
    this.onTicketUpdateEvent = this.onTicketUpdateEvent.bind(this);
  }
  public render() {
    const { title, loading, maxWidth, children, backgroundColor } = this.props;
    const { notification } = this.state;
    const titlePrepend = notification ? "*" : "";
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Helmet>
          <title>
            {titlePrepend}
            {title} | CSUS Helpdesk
          </title>
        </Helmet>
        <MaxWidthBox width={0.9} m={"auto"} maxWidth={maxWidth}>
          <Panel
            alignItems={"center"}
            flexDirection={"column"}
            p={"3%"}
            mb={"5%"}
            backgroundColor={backgroundColor}
          >
            {!loading ? (
              children
            ) : (
              <Box>
                <H1 textAlign={"center"}>Loading data...</H1>
              </Box>
            )}
          </Panel>
        </MaxWidthBox>
      </Flex>
    );
  }
  public componentDidMount() {
    SocketConn.addTicketUpdateEventListener(this.onTicketUpdateEvent);
  }
  public componentWillUnmount() {
    SocketConn.removeTicketUpdateEventListener(this.onTicketUpdateEvent);
  }
  private onServerNotification() {
    this.setState({ notification: true });
  }

  private async onTicketUpdateEvent({
    eventType,
    message
  }: ITicketUpdateEvent) {
    this.onServerNotification();
    let toastFn;
    switch (eventType) {
      case EventType.STARTED:
        toastFn = toast.warn;
        break;
      case EventType.ABANDONED:
        toastFn = toast.error;
        break;
      case EventType.ENDED:
        toastFn = toast.success;
        break;
      default:
        toastFn = toast.info;
    }
    playNotification();
    const success = await desktopNotification(eventType, message || "");
    if (!success) {
      toastFn(message || "", {
        toastId: "update",
        autoClose: 10000
      });
    }
  }
}

export default PageContainer;
