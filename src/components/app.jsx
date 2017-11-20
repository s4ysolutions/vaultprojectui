import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import { observer, inject } from 'mobx-react';

import Login from './visitor/login';
import Authentificated from './authentificated';

// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const muiTheme = createMuiTheme({ palette: createPalette({ type: 'light' }) });

const App = inject('mobx')(observer(({ mobx: { vault } }) =>
  <MuiThemeProvider theme={muiTheme}>
    <Switch>
      <Route exact path="/authentificate" component={Login} />
      {vault.isTokenVerified
        ? <Authentificated />
        : <Redirect to="/authentificate" />
      }
    </Switch>
  </MuiThemeProvider>));

// App.propTypes = { vault: PropTypes.object.isRequired };

export default App;
