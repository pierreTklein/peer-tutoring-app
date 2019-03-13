import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

export const Badge = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  -webkit-transform: translate(50%, -50%);
  -ms-transform: translate(50%, -50%);
  transform: translate(50%, -50%);
  -webkit-transform-origin: 100% 0%;
  -ms-transform-origin: 100% 0%;
  transform-origin: 100% 0%;

  z-index: 10;
  min-width: 15px;
  height: 20px;
  padding: 0 6px;
  color: ${theme.colors.white};
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  text-align: center;
  background: ${theme.colors.red};
  border-radius: 10px;
  -webkit-box-shadow: 0 0 0 1px #fff;
  box-shadow: 0 0 0 1px #fff;
`;

export default Badge;
