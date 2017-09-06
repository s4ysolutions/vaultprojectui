import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import { connect } from 'react-redux';

import Login from './visitor/login';
import Secrets from './authentificated/secrets';
import NotFound from './404';

const _ = o=>(console.log(o), o);

const muiTheme = createMuiTheme({
  palette: createPalette({
    type: 'light'
  })
});

const Authentificated = ({ isTokenVerified, ...props }) => isTokenVerified ? <Route {...props}/> : <Redirect to="/authentificate"/>;
Authentificated.propTypes = {
  isTokenVerified: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

const _App = ({ lastTab, isTokenVerified })=> 
  <MuiThemeProvider theme={muiTheme}>
    <Switch>
      <Route exact path="/authentificate" component={Login}/>
      <Authentificated isTokenVerified={isTokenVerified} exact path="/secrets" component={Secrets}/>
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
