import styled from "../Styles/styled-components";

interface IH2Props {
  weight?: string;
  color?: string;
  fontSize?: string;
  textAlign?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
}

export const H2 = styled.h3<IH2Props>`
  font-weight: ${props => props.weight || ""};
  font-size: ${props => props.fontSize || "24px"};
  text-align: ${props => props.textAlign || "left"};
  color: ${props => props.color || props.theme.colors.primary};
  margin-left: ${props => props.marginLeft || "initial"};
  margin-bottom: ${props => props.marginBottom || "12px"};
  margin-top: ${props => props.marginTop || "initial"};
  overflow-wrap: break-word;
`;

export default H2;
