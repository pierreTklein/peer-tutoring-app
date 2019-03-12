import * as React from "react";

import { Flex } from "@rebass/grid";
import { MaxWidthBox, Panel } from "./";
import Helmet from "react-helmet";

interface IPageContainerProps {
  title: string;
}

export const PageContainer: React.FunctionComponent<IPageContainerProps> = ({
  title,
  children
}) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Helmet>
        <title>{title} | CSUS Helpdesk</title>
      </Helmet>
      <MaxWidthBox width={0.9} m={"auto"}>
        <Panel
          alignItems={"center"}
          flexDirection={"column"}
          p={"5%"}
          mb={"5%"}
        >
          {children}
        </Panel>
      </MaxWidthBox>
    </Flex>
  );
};

export default PageContainer;
