import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';

import Login from './visitor/login';

const muiTheme = createMuiTheme({
  palette: createPalette({
    type: 'light'
  })
});

const App = ()=> 
  <MuiThemeProvider theme={muiTheme}>
    <Switch>
      <Route exact path="/login" component={Login}/>
    </Switch>
  </MuiThemeProvider>
;

export default App;
