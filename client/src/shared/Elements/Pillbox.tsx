import { Box } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

interface IPillboxProps {
  textColor?: string;
  backgroundColor?: string;
}

export const Pillbox = styled(Box)<IPillboxProps>`
  color: ${props => props.textColor || theme.colors.white};
  background-color: ${props =>
    props.backgroundColor || theme.colors.primaryDark};
  display: inline-block;
  padding: 0.25em 0.4em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0.1rem 0.1rem;
`;

export default Pillbox;
