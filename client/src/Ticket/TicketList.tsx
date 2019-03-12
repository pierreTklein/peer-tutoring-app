import * as React from "react";
import { ITicket } from "../config";
import { Ticket } from "./Ticket";
import { Panel } from "../shared";
import { Flex, Box } from "@rebass/grid";
import Collapsible from "../shared/Elements/Collapsible";

interface ITicketListProps {
  title: string;
  showStudentActions: boolean;
  showTutorActions: boolean;
  tickets: ITicket[];
  hidden?: boolean;
  onTicketUpdated: () => void;
  defaultOpened?: boolean;
}

export const TicketList: React.FunctionComponent<ITicketListProps> = ({
  showStudentActions,
  showTutorActions,
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
        <Flex
          style={{
            maxHeight: "40vh",
            overflow: "auto"
          }}
          flexDirection={"column"}
        >
          {tickets.length === 0
            ? "You don't have any questions."
            : tickets.map((ticket, index) => (
                <Box key={index} width={1}>
                  <Ticket
                    showStudentActions={showStudentActions}
                    showTutorActions={showTutorActions}
                    ticket={ticket}
                    onTicketUpdated={onTicketUpdated}
                    showTicketDetails={false}
                  />
                </Box>
              ))}
        </Flex>
      </Collapsible>
    </Panel>
  );
};

export default TicketList;
