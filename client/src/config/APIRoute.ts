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
  ACCOUNT_CONFIRM = "account/confirm",
  ACCOUNT_CONFIRM_RESEND = "account/confirm/resend",

  // Ticket routes
  TICKET = "ticket",
  TICKET_SELF = "ticket/me",
  TICKET_STATS = "ticket/stats",
  TICKET_ASSIGN_UNK = "ticket/assign",
  TICKET_ASSIGN = "ticket/:id/assign",
  TICKET_START = "ticket/:id/start",
  TICKET_END = "ticket/:id/end",
  TICKET_RATE = "ticket/:id/rate",
  TICKET_ABANDON = "ticket/:id/abandon",
  TICKET_POSITION = "ticket/:id/position",

  //Tutor routes
  TUTOR = "tutor",
  TUTOR_QUEUE = "tutor/:id/queue",

  //Course routes
  COURSE = "course"
}
export default APIRoute;
