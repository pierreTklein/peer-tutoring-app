import * as React from "react";
import { H2, Panel, Badge, Button, ButtonType } from "../shared";
import { Box } from "@rebass/grid";
import theme from "../shared/Styles/theme";

interface INumberStatProps {
  title: string;
  data: number;
  dataUnit?: string;
}

export const NumberStat: React.FunctionComponent<INumberStatProps> = ({
  data,
  title,
  dataUnit
}) => {
  return (
    <Panel width={1} p={"15px"} flexDirection={"column"}>
      <Box alignSelf={"center"}>
        <H2 color={theme.colors.greyDark}>
          {data.toFixed(0)} {dataUnit}
        </H2>
      </Box>
      <Box alignSelf={"center"}>{title}</Box>
    </Panel>
  );
};
