import { createGlobalStyle } from "./styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Hind+Siliguri:400,700');

  @font-face {
    font-family: 'Museo';
    font-style: normal;
    font-weight: lighter;
    src: url('/fonts/Museo100-Regular.otf');
  }

  @font-face {
    font-family: 'Museo';
    font-style: normal;
    font-weight: normal;
    src: url("/fonts/Museo300-Regular.otf");
  }

  @font-face {
    font-family: 'Museo';
    font-style: normal;
    font-weight: bolder;
    src: url("/fonts/Museo500-Regular.otf");
  }
  
  body {
    font-family: ${props => props.theme.fonts.body};
    margin: 0;
    padding: 0;
    
    & > #root {
      min-height: 100vh;
    }
  }

  a {
    color: ${props => props.theme.colors.greyDark};

    &:hover {
      color: ${props => props.theme.colors.greyLight};

    }

    transition: 0.15s color ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.header};
  }

  input, textarea, select {
    font-family: inherit;
  }

  .toast-notification {
    z-index: 100000;
  }
`;

export default GlobalStyles;
