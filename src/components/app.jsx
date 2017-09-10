import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import { connect } from 'react-redux';

import Login from './visitor/login';
import Authentificated from './authentificated';

const _ = o => (console.log(o), o);

const muiTheme = createMuiTheme({
  palette: createPalette({
    type: 'light'
  })
});
const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/authentificate" />;
ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

const _App = ({ isTokenVerified }) => (
  <MuiThemeProvider theme={muiTheme}>
    <Switch>
      <Route exact path="/authentificate" component={Login} />
      <ProtectedRoute
        isAllowed={isTokenVerified}
        path="/"
        component={Authentificated}
      />
    </Switch>
  </MuiThemeProvider>
);

_App.propTypes = {
  isTokenVerified: PropTypes.bool.isRequired
};

const App = withRouter(
  connect(state => ({
    isTokenVerified: state.vaultState.isTokenVerified
  }))(_App)
);
export default App;
