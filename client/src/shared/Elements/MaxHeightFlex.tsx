import { Flex } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

interface IMaxHeightFlexProps {
  height?: string | number;
  roundedBorder?: boolean;
}

export const MaxHeightFlex = styled(Flex)<IMaxHeightFlexProps>`
  -webkit-border-radius: ${props => (props.roundedBorder ? "9px" : "")};
  -moz-border-radius: ${props => (props.roundedBorder ? "9px" : "")};
  border-radius: ${props => (props.roundedBorder ? "9px" : "")};
  max-height: ${props => props.height || "40vh"};
  overflow: auto;
`;

export default MaxHeightFlex;
