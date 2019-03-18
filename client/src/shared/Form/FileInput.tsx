import styled from "styled-components";

export const FileInput = styled.input`
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

export default FileInput;
