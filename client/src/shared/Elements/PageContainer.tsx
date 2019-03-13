import * as React from "react";

import { Flex, Box } from "@rebass/grid";
import { MaxWidthBox, Panel, H1 } from "./";
import Helmet from "react-helmet";

interface IPageContainerProps {
  title: string;
  loading?: boolean;
}

export const PageContainer: React.FunctionComponent<IPageContainerProps> = ({
  title,
  loading,
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
          {!loading ? (
            children
          ) : (
            <Box>
              <H1 textAlign={"center"}>Loading data...</H1>
            </Box>
          )}
        </Panel>
      </MaxWidthBox>
    </Flex>
  );
};

export default PageContainer;
