import * as React from "react";
import { ITicket } from "../config";

import { AutoSizer, List, ListRowProps } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import { Ticket } from "./Ticket";

interface ITicketListProps {
  tickets: ITicket[];
}

export const TicketList: React.FunctionComponent<ITicketListProps> = ({
  tickets
}) => {
  function rowRenderer({ key, index, style }: ListRowProps) {
    return (
      <div key={key} style={style}>
        <Ticket ticket={tickets[index]} />
      </div>
    );
  }
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          rowCount={tickets.length}
          rowHeight={20}
          rowRenderer={rowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  );
};
