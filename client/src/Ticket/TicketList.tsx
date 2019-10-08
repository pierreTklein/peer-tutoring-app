import * as React from "react";
import { ITicket, UserType } from "../config";
import { Ticket } from "./Ticket";
import { Panel } from "../shared";
import { Box } from "@rebass/grid";
import { Collapsible, MaxHeightFlex } from "../shared/Elements";

interface ITicketListProps {
  title: string;
  view: UserType;
  tickets: ITicket[];
  hidden?: boolean;
  onTicketUpdated: () => void;
  defaultOpened?: boolean;
}

export const TicketList: React.FunctionComponent<ITicketListProps> = ({
  view,
  tickets,
  title,
  hidden,
  onTicketUpdated,
  defaultOpened
}) => {
  if (hidden) {
    return <div />;
  }
  return (
    <Panel width={1} mt={"5%"} p={"15px"} flexDirection={"column"}>
      <Collapsible
        title={`${title} (${tickets.length})`}
        hidden={hidden}
        open={defaultOpened || false}
      >
        <MaxHeightFlex flexDirection={"column"} roundedBorder={true}>
          {tickets.length === 0
            ? "You don't have any questions."
            : tickets.map((ticket, index) => (
                <Box key={index} width={1}>
                  <Ticket
                    view={view}
                    ticket={ticket}
                    onTicketUpdated={onTicketUpdated}
                    showTicketDetails={false}
                  />
                </Box>
              ))}
        </MaxHeightFlex>
      </Collapsible>
    </Panel>
  );
};

export default TicketList;
