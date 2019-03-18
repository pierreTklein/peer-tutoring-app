import React, { Component } from "react";
import Login from "./Login/Login";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import { FrontendRoute, IAccount, UserType } from "./config";
import withNavbar from "./shared/HOC/withNavbar";
import withAuthRedirect from "./shared/HOC/withAuthRedirect";
import withThemeProvider from "./shared/HOC/withThemeProvider";
import ResetPasswordContainer from "./Login/ResetPasswordContainer";
import withTokenRedirect from "./shared/HOC/withTokenRedirect";
import ForgotPasswordContainer from "./Login/ForgotPasswordContainer";
import WithToasterContainer from "./shared/HOC/withToaster";
import CreateTicket from "./Ticket/CreateTicket";
import { isUserType } from "./util";
import { CreateAccount } from "./AccountManagement/CreateAccount";
import { EditAccount } from "./AccountManagement/EditAccount";
import ConfirmAccountContainer from "./ConfirmAccount/Confirmed";
import NotConfirmedContainer from "./ConfirmAccount/NotConfirmed";
import InviteContainer from "./Invite/Invite";
import Dashboard from "./Dashboard/Dashboard";
import { requestPermission } from "./util/notifications";

class App extends Component {
  render() {
    requestPermission();
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path={FrontendRoute.LOGIN_PAGE}
            component={withNavbar(
              withAuthRedirect(Login, { requiredAuthState: false })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.RESET_PASSWORD_PAGE}
            component={withNavbar(withTokenRedirect(ResetPasswordContainer))}
          />
          <Route
            exact={true}
            path={FrontendRoute.FORGOT_PASSWORD_PAGE}
            component={withNavbar(ForgotPasswordContainer)}
          />
          <Route
            exact={true}
            path={FrontendRoute.CREATE_TICKET}
            component={withNavbar(
              withAuthRedirect(CreateTicket, {
                redirTo: FrontendRoute.HOME_PAGE,
                AuthVerification: (account: IAccount) =>
                  isUserType(account, UserType.STUDENT)
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.CREATE_ACCOUNT_PAGE}
            component={withNavbar(
              withAuthRedirect(CreateAccount, { requiredAuthState: false })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.EDIT_ACCOUNT_PAGE}
            component={withNavbar(
              withAuthRedirect(EditAccount, {
                redirTo: FrontendRoute.CONFIRM_ACCOUNT_RESEND,
                AuthVerification: (account: IAccount) => account.confirmed
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.INVITE_ACCOUNT}
            component={withNavbar(
              withAuthRedirect(InviteContainer, {
                AuthVerification: (account: IAccount) =>
                  isUserType(account, UserType.STAFF)
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.CONFIRM_ACCOUNT}
            component={withNavbar(withTokenRedirect(ConfirmAccountContainer))}
          />
          <Route
            exact={true}
            path={FrontendRoute.CONFIRM_ACCOUNT_RESEND}
            component={withNavbar(withAuthRedirect(NotConfirmedContainer))}
          />
          <Route
            path={FrontendRoute.HOME_PAGE}
            component={withNavbar(
              withAuthRedirect(Dashboard, {
                redirTo: FrontendRoute.CONFIRM_ACCOUNT_RESEND,
                AuthVerification: (account: IAccount) => account.confirmed
              })
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default WithToasterContainer(withThemeProvider(App));
