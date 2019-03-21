export enum FrontendRoute {
  HOME_PAGE = "/",
  LOGIN_PAGE = "/login",
  RESET_PASSWORD_PAGE = "/password/reset",
  FORGOT_PASSWORD_PAGE = "/password/forgot",

  MY_ACCOUNT_PAGE = "/account/",
  VIEW_ACCOUNT_PAGE = "/account/:id",
  CREATE_ACCOUNT_PAGE = "/account/new",
  EDIT_ACCOUNT_PAGE = "/account/edit",
  CONFIRM_ACCOUNT = "/account/confirm",
  INVITE_ACCOUNT = "/account/invite",
  CONFIRM_ACCOUNT_RESEND = "/account/confirm/resend",

  CREATE_TICKET = "/question/new",
  TICKET_STATS = "/stats",

  FAQ = "/faq"
}

export default FrontendRoute;
