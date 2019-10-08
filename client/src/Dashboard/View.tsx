import { Flex } from "@rebass/grid";
import * as React from "react";

import { Card, H2, Image, LinkDuo } from "../shared/Elements";

interface IDashboardView {
  cards: IDashboardCard[];
}

export interface IDashboardCard {
  title: string;
  route: string;
  imageSrc?: any;
  validation?: () => boolean;
  hidden?: boolean;
  disabled?: boolean;
}

const DashboardView: React.FunctionComponent<IDashboardView> = ({ cards }) => {
  return (
    <Flex flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
      {cards.map(card => (
        <LinkDuo
          to={card.route}
          onClick={eventHandleWrapperFactory(card)}
          style={{ textDecoration: "none" }}
          key={card.title}
          hidden={card.hidden}
        >
          <Card
            width={"250px"}
            flexDirection={"column"}
            disabled={card.disabled}
          >
            <H2 fontSize={"28px"} marginBottom={"0px"} textAlign={"center"}>
              {card.title}
            </H2>
            {card.imageSrc && <Image src={card.imageSrc} imgHeight={"125px"} />}
          </Card>
        </LinkDuo>
      ))}
    </Flex>
  );
};

function eventHandleWrapperFactory(card: IDashboardCard) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (card.disabled || (card.validation && !card.validation())) {
      e.preventDefault();
    }
  };
}

export default DashboardView;
