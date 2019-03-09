import { Box } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

export const Pillbox = styled(Box)`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primaryDark};
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 2px;
`;

export default Pillbox;
