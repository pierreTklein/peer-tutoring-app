import { Box } from "@rebass/grid";
import styled from "../Styles/styled-components";

export const PrewrapBox = styled(Box)`
  width: inherit;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-line;
`;

export default PrewrapBox;
