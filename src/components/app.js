import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import { connect } from 'react-redux';

import Login from './visitor/login';
import Secrets from './authentificated/secrets';
import Polices from './authentificated/polices';
import Grants from './authentificated/grants';

const _ = o=>(console.log(o), o);

const muiTheme = createMuiTheme({
  palette: createPalette({
    type: 'light'
  })
});

const ProtectedRoute = ({ isAllowed, ...props }) => isAllowed ? <Route {...props}/> : <Redirect to="/authentificate"/>;
ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

const _App = ({ lastTab, isTokenVerified })=> 
  <MuiThemeProvider theme={muiTheme}>
    <Switch>
      <Route exact path="/authentificate" component={Login}/>
      <ProtectedRoute isAllowed={isTokenVerified} exact path="/secrets" component={Secrets}/>
      <ProtectedRoute isAllowed={isTokenVerified} exact path="/polices" component={Polices}/>
      <ProtectedRoute isAllowed={isTokenVerified} exact path="/grants" component={Grants}/>
      <Redirect from="/" to={lastTab}/>
    </Switch>
  </MuiThemeProvider>;

_App.propTypes = {
  isTokenVerified: PropTypes.bool.isRequired,
  lastTab: PropTypes.string.isRequired
};

const App = withRouter(connect(state=>({
  isTokenVerified: state.transient.isTokenVerified,
  lastTab: state.persistent.lastTab
}))(_App));
export default App;
