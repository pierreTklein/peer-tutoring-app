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
import { Section } from "../shared";
import { Flex } from "@rebass/grid";

interface ITicketListProps {
  title: string;
  tickets: ITicket[];
  hidden?: boolean;
  height?: string | number;
}

export const TicketList: React.FunctionComponent<ITicketListProps> = ({
  tickets,
  title,
  hidden,
  height
}) => {
  const cache = new CellMeasurerCache({
    defaultHeight: 200,
    fixedWidth: true
  });
  function rowRenderer({ key, index, style, parent }: ListRowProps) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => {
          return (
            <div style={style}>
              <Ticket ticket={tickets[index]} onLoad={measure} />
            </div>
          );
        }}
      </CellMeasurer>
    );
  }
  function renderList() {
    return (
      <Flex
        style={{
          height: height || "200px"
        }}
      >
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
      </Flex>
    );
  }

  return (
    <Section title={title} hidden={hidden}>
      {tickets.length > 0 ? renderList() : ""}
    </Section>
  );
};

export default TicketList;
