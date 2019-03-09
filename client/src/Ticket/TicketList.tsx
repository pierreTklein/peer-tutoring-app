import * as React from "react";
import { ITicket } from "../config";

import {
  AutoSizer,
  List,
  ListRowProps,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import { Ticket } from "./Ticket";
import { MaxWidthBox } from "../shared";
import { Flex } from "@rebass/grid";

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
});

interface ITicketListProps {
  tickets: ITicket[];
}

export const TicketList: React.FunctionComponent<ITicketListProps> = ({
  tickets
}) => {
  function rowRenderer({ key, index, style, parent }: ListRowProps) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style} onLoad={measure}>
            <Ticket ticket={tickets[index]} />
          </div>
        )}
      </CellMeasurer>
    );
  }
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <List
            rowCount={tickets.length}
            height={height}
            width={width}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
          />
        );
      }}
    </AutoSizer>
  );
};

export default TicketList;
