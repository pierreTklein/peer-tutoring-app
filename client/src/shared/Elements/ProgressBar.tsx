import * as React from "react";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";
import { Box } from "@rebass/grid";

interface IProgressBarProps {
  percentage: number | string;
}

const _progress = styled(Box)<IProgressBarProps>`
  position: relative;
  height: 10px;
  width: 100%;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  > div {
    background: ${theme.colors.primary};
    height: 100%;
    width: ${props => props.percentage}%;
    border-radius: inherit;
    transition: width 0.2s ease-in;
  }
`;

export const ProgressBar: React.FunctionComponent<
  IProgressBarProps
> = props => {
  return (
    <_progress {...props}>
      <div />
    </_progress>
  );
};

export default ProgressBar;
