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
import { Collapse } from "@material-ui/core";

interface ITicketListProps {
  title: string;
  showStudentActions: boolean;
  showTutorActions: boolean;
  tickets: ITicket[];
  hidden?: boolean;
  height?: string | number;
  onTicketUpdated: () => void;
}

export const TicketList: React.FunctionComponent<ITicketListProps> = ({
  showStudentActions,
  showTutorActions,
  tickets,
  title,
  hidden,
  height,
  onTicketUpdated
}) => {
  const cache = new CellMeasurerCache({
    defaultHeight: 273,
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
            <div style={style} onLoad={measure}>
              <Ticket
                showStudentActions={showStudentActions}
                showTutorActions={showTutorActions}
                ticket={tickets[index]}
                onTicketUpdated={onTicketUpdated}
              />
            </div>
          );
        }}
      </CellMeasurer>
    );
  }

  const _height = height || 220 * tickets.length;
  return (
    <Section title={title} hidden={hidden} collapsable={true}>
      <Flex
        style={{
          height: _height
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
    </Section>
  );
};

export default TicketList;
