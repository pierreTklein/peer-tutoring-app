export enum APIRoute {
    // Auth routes
    AUTH_LOGIN = 'auth/login',
    AUTH_LOGOUT = 'auth/logout',
    AUTH_FORGOT_PASS = 'auth/password/forgot',
    AUTH_RESET_PASS = 'auth/password/reset',
    AUTH_CHANGE_PASS = 'auth/password/change',
  
    // Account routes
    ACCOUNT = 'account',
    ACCOUNT_SELF = 'account/self',
    ACCOUNT_INVITE = 'account/invite',
}
export default APIRoute;
  