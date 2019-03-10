import { Flex } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

interface IPanelProps {
  backgroundColor?: string;
}

export const Panel = styled(Flex)<IPanelProps>`
  background: ${props => props.backgroundColor || theme.colors.white};
  filter: alpha(opacity=30);
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 34px;
`;

export default Panel;
