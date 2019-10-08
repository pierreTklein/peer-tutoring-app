import * as React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import theme from "../Styles/theme";

const withThemeProvider = <P extends {}>(Component: React.ComponentType<P>) => (
  props: P
) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Component {...props} />
      </div>
    </ThemeProvider>
  );
};

export default withThemeProvider;
