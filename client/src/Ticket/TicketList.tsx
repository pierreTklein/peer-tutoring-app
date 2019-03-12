import * as React from "react";
import { ITicket } from "../config";
import { Ticket } from "./Ticket";
import { Section } from "../shared";
import { Flex, Box } from "@rebass/grid";

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
  const innerContents =
    tickets.length === 0 ? (
      "You don't have any questions."
    ) : (
      <Flex
        style={{
          maxHeight: "50vh",
          overflow: "auto"
        }}
        width={1}
        flexDirection={"column"}
      >
        {tickets.map((ticket, index) => (
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
    );
  return (
    <Section
      title={`${title} (${tickets.length})`}
      hidden={hidden}
      collapsable={true}
      defaultOpen={defaultOpened}
    >
      {innerContents}
    </Section>
  );
};

export default TicketList;
