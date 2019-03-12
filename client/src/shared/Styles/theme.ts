const theme = {
  colors: {
    purple: "#8840a7",
    green: "#249948",
    orange: "#ffa500",
    yellow: "#ecb911",
    red: "#d21d27",

    greyLighter: "#F4F4F4",
    greyLight: "#BCBCBC",
    grey: "#939598",
    greyDark: "#4D4D4D",
    primaryLight: "#80c2dd",
    primary: "#25AAE1",
    primaryDark: "#008cba",
    white: "#FFFFFF"
  },
  inputBorderRadius: "20px",
  fonts: {
    header: "Museo, -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
    body:
      "Avenir, Hind Siliguri, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;"
  }
};

export interface ITheme {
  colors: {
    greyLighter: string;
    greyLight: string;
    grey: string;
    greyDark: string;
    primaryLight: string;
    primary: string;
    primaryDark: string;
    white: string;
  };
  fonts: {
    header: string;
    body: string;
  };
  inputBorderRadius: string;
}

export default theme;
