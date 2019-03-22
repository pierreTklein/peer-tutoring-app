import * as React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { H2, Panel } from "../shared";
import { Box } from "@rebass/grid";
import theme from "../shared/Styles/theme";
import _ from "lodash";
import { COLORS } from "../config";

export enum FootTrafficView {
  COURSE = "Courses",
  CATEGORY = "Categories"
}

interface IFootTrafficProps {
  data: Array<{
    total: 0;
    course: {
      [key: string]: number;
    };
    category: {
      [key: string]: number;
    };
    name?: number | string;
  }>;
  view: FootTrafficView;
  title: string;
  indexToName?: (index: number) => string | number;
  xLabel?: string;
  yLabel?: string;
}

export const FootTraffic: React.FunctionComponent<IFootTrafficProps> = ({
  data,
  title,
  indexToName = i => i,
  view
}) => {
  const itemKeys: string[] = [];
  data.forEach(v => {
    switch (view) {
      case FootTrafficView.COURSE:
        for (const course in v.course) {
          if (v.course.hasOwnProperty(course)) {
            itemKeys.push(course);
          }
        }
        break;
      case FootTrafficView.CATEGORY:
        for (const category in v.category) {
          if (v.category.hasOwnProperty(category)) {
            itemKeys.push(category);
          }
        }
        break;
    }
  });

  const formattedData = data.map((v, i) => {
    /** Flatten the data so that either course or category is at the top. */
    const itemData: { [key: string]: number } = {};
    itemKeys.forEach(v => (itemData[v] = 0));
    switch (view) {
      case FootTrafficView.COURSE:
        for (const course in v.course) {
          if (v.course.hasOwnProperty(course)) {
            itemData[course] = v.course[course];
          }
        }
        break;
      case FootTrafficView.CATEGORY:
        for (const category in v.category) {
          if (v.category.hasOwnProperty(category)) {
            itemData[category] = v.category[category];
          }
        }
        break;
    }
    return { ...itemData, name: indexToName(i) };
  });

  const lines: Array<React.ReactElement> = [];
  const uniqueItems = _.uniq(itemKeys);
  uniqueItems.forEach((v, i) => {
    const color = COLORS[i % COLORS.length];
    lines.push(
      <Area
        key={i}
        type="monotone"
        dataKey={v}
        stackId="1"
        stroke={color}
        fill={color}
      />
    );
  });

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
        <ResponsiveContainer aspect={8.0 / 3.0} width="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            {lines}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Panel>
  );
};
