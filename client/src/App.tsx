import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { FrontendRoute } from './config';
import withNavbar from './shared/HOC/withNavbar';
import withAuthRedirect from './shared/HOC/withAuthRedirect';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path={FrontendRoute.HOME_PAGE}
            component={withNavbar(withAuthRedirect(Login))}
          />
        </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
