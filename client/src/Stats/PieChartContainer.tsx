import * as React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
  ContentRenderer
} from "recharts";
import { H2, Panel } from "../shared";
import { Box } from "@rebass/grid";
import theme from "../shared/Styles/theme";
import { COLORS } from "../config";

interface IPieChartContainerProps {
  data: object[];
  title: string;
}
const RADIAN = Math.PI / 180;

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
              outerRadius={"80%"}
              label={renderCustomizedLabel}
              labelLine={false}
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

const renderCustomizedLabel: ContentRenderer<PieLabelRenderProps> = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name
}: PieLabelRenderProps) => {
  cx = Number(cx);
  cy = Number(cy);
  innerRadius = Number(innerRadius);
  outerRadius = Number(outerRadius);
  percent = percent * 100;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent > 10) {
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={"start"}
        dominantBaseline={"middle"}
      >
        {`${percent.toFixed(0)}%`}
      </text>
    );
  } else {
    return <div />;
  }
};
