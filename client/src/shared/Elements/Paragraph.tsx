import styled from "../Styles/styled-components";

export interface IParagraphProps {
  fontSize?: string;
  textAlign?: string;
  italic?: boolean;
  paddingBottom?: string;
  maxWidth?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  color?: string;
}

export const Paragraph = styled.p<IParagraphProps>`
  ${props => props.italic && "font-style: italic;"}
  font-size: ${props => props.fontSize || "19px"};
  color: ${props => props.color || props.theme.colors.greyDark};
  text-align: ${props => props.textAlign || "left"};
  padding-bottom: ${props => props.paddingBottom || 0};
  max-width: ${props => props.maxWidth || "600px"};
  margin-bottom: ${props => props.marginBottom || 0};
  margin-left: ${props => props.marginLeft || 0};
  margin-right: ${props => props.marginRight || 0};
  margin-top: ${props => props.marginTop || 0};
`;

export const FormDescription = styled(Paragraph)`
  font-size: 14px;
  margin-top: 4px;
  margin-left: 10px;
  font-style: italic;
`;
export default Paragraph;
