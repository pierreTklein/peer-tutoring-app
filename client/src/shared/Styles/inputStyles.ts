import { css } from "./styled-components";

export enum InputLocation {
  LEFT = "left",
  FULL = "full",
  RIGHT = "right"
}

export interface IInputProps {
  location?: InputLocation;
  isTight?: boolean;
  fontWeight?: string;
}

function calcBorderRadius(location?: InputLocation) {
  const r = "20px";
  const nr = "0px";
  switch (location) {
    case InputLocation.LEFT:
      return `${r} ${nr} ${nr} ${r}`;
    case InputLocation.RIGHT:
      return `${nr} ${r} ${r} ${nr}`;
    default:
      return `${r}`;
  }
}

export const inputStyles = css<IInputProps>`
  border-radius: ${props => calcBorderRadius(props.location)};
  border: 2px solid ${props => props.theme.colors.greyLight};
  border-right-style: ${props =>
    props.location && props.location === InputLocation.LEFT ? "none" : ""};
  font-weight: ${props => props.fontWeight || "normal"};
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: ${props => (props.isTight ? "8px" : "20px")};
  min-height: 42px;
  padding-left: 16px;
  width: 100%;
  transition: 0.25s border ease-in;

  &:focus,
  &:hover {
    border: 2px solid ${props => props.theme.colors.grey};
  }
`;

export default inputStyles;
