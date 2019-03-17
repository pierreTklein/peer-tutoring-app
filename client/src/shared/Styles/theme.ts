const theme = {
  colors: {
    purple: "#8840a7",
    purpleDark: "#632e7a",
    green: "#249948",
    greenDark: "#155b2a",
    orange: "#ffa500",
    orangeDark: "#b57500",
    yellow: "#ecb911",
    yellowDark: "#af890c",
    red: "#d21d27",
    redDark: "#99131b",

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
