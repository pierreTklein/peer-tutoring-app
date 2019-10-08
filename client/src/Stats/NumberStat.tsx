import * as React from "react";
import { H2, Panel } from "../shared";
import { Box } from "@rebass/grid";
import theme from "../shared/Styles/theme";

interface INumberStatProps {
  title: string;
  data: number;
  dataUnit?: string;
  onClick?: () => void;
  backgroundColor?: ((data: number) => string) | string;
}

export const NumberStat: React.FunctionComponent<INumberStatProps> = ({
  data,
  title,
  dataUnit,
  onClick,
  backgroundColor
}) => {
  return (
    <Panel
      width={1}
      p={"15px"}
      flexDirection={"column"}
      onClick={onClick}
      cursor={onClick ? "pointer" : ""}
      style={{ minWidth: "100px" }}
      backgroundColor={
        backgroundColor &&
        (typeof backgroundColor === "string"
          ? backgroundColor
          : backgroundColor(data))
      }
    >
      <Box alignSelf={"center"}>
        <H2 color={theme.colors.greyDark}>
          {data.toFixed(0)}
          {dataUnit ? ` ${dataUnit}` : ""}
        </H2>
      </Box>
      <Box alignSelf={"center"}>{title}</Box>
    </Panel>
  );
};
