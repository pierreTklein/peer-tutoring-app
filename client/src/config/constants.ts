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
