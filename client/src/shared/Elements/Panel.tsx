import { Flex } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

interface IPanelProps {
  backgroundColor?: string;
  cursor?: string;
}

export const Panel = styled(Flex)<IPanelProps>`
  background: ${props => props.backgroundColor || theme.colors.white};
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0px 10px;
  cursor: ${props => props.cursor || ""};
`;

export default Panel;
