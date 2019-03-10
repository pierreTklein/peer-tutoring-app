export enum FrontendRoute {
  HOME_PAGE = "/",
  LOGIN_PAGE = "/login",
  RESET_PASSWORD_PAGE = "/password/reset",
  FORGOT_PASSWORD_PAGE = "/password/forgot",

  MY_ACCOUNT_PAGE = "/account/",
  VIEW_ACCOUNT_PAGE = "/account/:id",
  CREATE_ACCOUNT_PAGE = "/account/new",

  CREATE_TICKET = "/ticket/new"
}

export default FrontendRoute;
