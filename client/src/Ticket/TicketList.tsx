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
  const cache = new CellMeasurerCache({
    defaultHeight: 150,
    fixedWidth: true
  });
  const showDetails: boolean[] = tickets.map(() => false);
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
              <Ticket
                showStudentActions={showStudentActions}
                showTutorActions={showTutorActions}
                ticket={tickets[index]}
                onTicketUpdated={onTicketUpdated}
                showTicketDetails={showDetails[index]}
                onLoad={measure}
                onCollapseChange={(isOpen: boolean) => {
                  showDetails[index] = isOpen;
                  cache.clear(index, 0);
                  measure();
                }}
              />
            </div>
          );
        }}
      </CellMeasurer>
    );
  }

  const _height =
    tickets.length > 0
      ? tickets.map((v, i) => cache.getHeight(i, 0)).reduce((pv, cv) => pv + cv)
      : 0;
  const innerContents =
    tickets.length === 0 ? (
      "No applicable questions found"
    ) : (
      <Flex
        style={{
          height: _height,
          maxHeight: "calc(100vh * 0.5)"
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
