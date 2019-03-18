import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  WARNING = "warning",
  DANGER = "danger",
  SUCCESS = "success"
}

export interface IButtonProps {
  isLoading?: boolean;
  isNarrow?: boolean;
  disabled?: boolean;
  buttonType: ButtonType;
}

const colors = {
  primary: theme.colors.primary,
  success: theme.colors.green,
  secondary: theme.colors.grey,
  warning: theme.colors.yellow,
  danger: theme.colors.red
};

const colorsDark = {
  primary: theme.colors.primaryDark,
  success: theme.colors.greenDark,
  secondary: theme.colors.greyDark,
  warning: theme.colors.yellowDark,
  danger: theme.colors.redDark
};

export const Button = styled.button<IButtonProps>`
  background-color: ${props => colors[props.buttonType]};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.header};
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  min-width: ${props => (!props.isNarrow ? "100px" : "initial")};
  cursor: pointer;
  transition: 0.15s linear all;
  font-weight: bold;
  position: relative;

  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        color: ${props.theme.colors.greyLighter};
        background-color: ${props.theme.colors.greyLight};
      `
      : `&:hover {
          background-color: ${colorsDark[props.buttonType]};
        }
    `}

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  ${props =>
    props.isLoading &&
    `
    color: ${props.theme.colors.greyLight};
    &:hover {
      color: ${props.theme.colors.greyLight};
    }
    &:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      border-radius: 50%;
      border: 3px solid ${props.theme.colors.grey};
      border-top-color: ${props.theme.colors.white};
      animation: spinner .8s ease infinite;
    }`}
`;

export default Button;
