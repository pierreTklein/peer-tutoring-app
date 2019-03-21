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

interface IPieChartContainerProps {
  data: object[];
  title: string;
}

export const PieChartContainer: React.FunctionComponent<
  IPieChartContainerProps
> = ({ data, title }) => {
  const COLORS = [theme.colors.green, theme.colors.grey, theme.colors.red];
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
            <Pie data={data} dataKey="value" nameKey="key" outerRadius={"90%"}>
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
