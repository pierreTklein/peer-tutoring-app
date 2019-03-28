import styled from "../Styles/styled-components";

export const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${props => props.theme.colors.white};
  text-align: center;
  margin-top: 10px;
`;

export default Footer;
