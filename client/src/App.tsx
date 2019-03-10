import React, { Component } from "react";
import "./App.css";
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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path={FrontendRoute.HOME_PAGE}
            component={withNavbar(withAuthRedirect(CreateTicket))}
          />
          <Route
            exact={true}
            path={FrontendRoute.LOGIN_PAGE}
            component={withNavbar(
              withAuthRedirect(Login, {
                requiredAuthState: false
              })
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
                AuthVerification: (account: IAccount) =>
                  account.accountType.includes(UserType.STUDENT)
              })
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default WithToasterContainer(withThemeProvider(App));
