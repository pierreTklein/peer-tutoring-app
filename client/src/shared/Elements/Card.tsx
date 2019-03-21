import { Flex } from "@rebass/grid";
import styled from "../Styles/styled-components";
import theme from "../Styles/theme";

interface ICardProps {
  backgroundColor?: string;
  disabled?: boolean;
}

export const Card = styled(Flex)<ICardProps>`
  background: ${props => props.backgroundColor || theme.colors.white};
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);

  max-width: 250px;
  margin: 15px;
  position: relative;
  padding: 20px;
  transition: transform 0.2s; /* Animation */

  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        filter: grayscale(100%);
        &:after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0,0,0,0.1);
          top: 0;
          left: 0;
        }
      `
      : `
  &:hover {
    transform: scale(1.01);
  }
  `}
`;

export default Card;
