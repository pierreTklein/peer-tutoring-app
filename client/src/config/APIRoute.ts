export enum APIRoute {
  // Auth routes
  AUTH_LOGIN = "auth/login",
  AUTH_LOGOUT = "auth/logout",
  AUTH_FORGOT_PASS = "auth/password/forgot",
  AUTH_RESET_PASS = "auth/password/reset",
  AUTH_CHANGE_PASS = "auth/password/change",

  // Account routes
  ACCOUNT = "account",
  ACCOUNT_SELF = "account/self",
  ACCOUNT_INVITE = "account/invite",

  // Ticket routes
  TICKET = "ticket",
  TICKET_SELF = "ticket/me",
  TICKET_ASSIGN = "ticket/assign",
  TICKET_START = "ticket/:id/start",
  TICKET_END = "ticket/:id/end",
  TICKET_RATE = "ticket/:id/rate",

  //Tutor routes
  TUTOR = "tutor"
}
export default APIRoute;
