import { Flex } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

interface IPanelProps {
  backgroundColor?: string;
  cursor?: string;
}

export const Panel = styled(Flex)<IPanelProps>`
  background: ${props => props.backgroundColor || theme.colors.white};
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  cursor: ${props => props.cursor || ""};
`;

export default Panel;
