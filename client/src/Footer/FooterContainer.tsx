import React from "react";
import { Image, Footer } from "../shared/Elements";
import { Flex, Box } from "@rebass/grid";
import { LinkDuo } from "../shared";
import github from "../assets/images/GitHub-Mark-32px.png";

export const FooterContainer: React.FunctionComponent<{}> = () => (
  <Footer>
    <Flex width={1} alignItems={"baseline"} px={"2px"}>
      <Box flex={1}>
        <Flex justifyContent={"flex-end"} alignItems={"baseline"}>
          <Box m={"5px"}>
            🚀<LinkDuo to={"https://pierretheoklein.com"}>About</LinkDuo>
          </Box>
          <Box m={"5px"}>
            <LinkDuo
              to={
                "https://github.com/pierreTklein/peer-tutoring-app/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D"
              }
            >
              Bugs
            </LinkDuo>
          </Box>
          <Box m={"5px"}>
            <LinkDuo
              to={
                "https://github.com/pierreTklein/peer-tutoring-app/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeature%5D"
              }
            >
              Requests
            </LinkDuo>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Footer>
);
export default FooterContainer;
