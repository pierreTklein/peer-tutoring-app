export const LOCAL_URL = "http://localhost:3000/";
export const PROD_URL = "/";

export const LOCAL_API_URL = `${LOCAL_URL}api`;
export const PROD_API_URL = `${PROD_URL}api`;

export const IS_LOCALHOST = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export const URL = IS_LOCALHOST ? LOCAL_URL : PROD_URL;
export const API_URL = IS_LOCALHOST ? LOCAL_API_URL : PROD_API_URL;

export const CACHE_USER_KEY = "userInfo";

// LabelTextComponent page
export const REQUIRED_INPUT = "*";
export const OPTIONAL_INPUT = "(Optional)";

// Used in multiple locations:
export const EMAIL_LABEL = "Email";
export const PASSWORD_LABEL = "Password";
export const REQUIRED_DESCRIPTION =
  "Required fields are denoted with an asterisk (*)";

export const FIRST_NAME_LABEL = "First Name";
export const LAST_NAME_LABEL = "Last Name";
export const PRONOUN_LABEL = "Preferred Pronoun";
export const OLD_PASSWORD_LABEL = "Old password";
export const NEW_PASSWORD_LABEL = "New password";

export const SERVICE_NAME = "CSUS Helpdesk";
export const SERVICE_LOCATION =
  "https://www.google.com/maps/place/Trottier+Bldg,+3630+Rue+University,+Montreal,+QC+H3A+2B2,+Canada/";

export const COLORS = [
  // "#e6194b",
  // "#3cb44b",
  // "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080"
];
