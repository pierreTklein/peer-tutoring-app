import * as React from "react";

import { Collapsible, Panel, Paragraph } from "../shared/Elements";
import theme from "../shared/Styles/theme";

interface IFAQProps {
  title: string;
}

const Question: React.FunctionComponent<IFAQProps> = ({ title, children }) => {
  return (
    <Panel width={1} mt={"5%"} p={"15px"} flexDirection={"column"}>
      <Collapsible
        title={title}
        open={false}
        titleColor={theme.colors.greyDark}
        titleWeight={"lighter"}
      >
        <Paragraph marginTop={"10px"}>{children}</Paragraph>
      </Collapsible>
    </Panel>
  );
};

export default Question;
