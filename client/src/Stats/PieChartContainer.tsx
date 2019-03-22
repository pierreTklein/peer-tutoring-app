import * as React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps
} from "recharts";
import { H2, Panel } from "../shared";
import { Box } from "@rebass/grid";
import theme from "../shared/Styles/theme";
import { COLORS } from "../config";

interface IPieChartContainerProps {
  data: object[];
  title: string;
}

export const PieChartContainer: React.FunctionComponent<
  IPieChartContainerProps
> = ({ data, title }) => {
  return (
    <Panel width={1} p={"15px"} flexDirection={"column"}>
      <Box width={1}>
        <H2
          weight={"lighter"}
          color={theme.colors.greyDark}
          textAlign={"center"}
        >
          {title}
        </H2>
        <ResponsiveContainer aspect={1 / 1} width="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="key"
              cx={"50%"}
              cy={"50%"}
              outerRadius={"90%"}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Panel>
  );
};
