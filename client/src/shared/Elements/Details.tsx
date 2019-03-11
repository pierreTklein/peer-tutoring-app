import styled from "../Styles/styled-components";

export const Details = styled.details`
  &[open] > summary:before {
    content: "–";
  }
  > summary::-webkit-details-marker {
    display: none;
  }
  > summary:before {
    content: "+";
    float: right;
    font-size: 1.3em;
    font-weight: bold;
    padding: 0;
    text-align: center;
    width: 20px;
  }
`;
export default Details;
