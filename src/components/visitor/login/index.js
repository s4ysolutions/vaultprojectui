import React from 'react';
import Media from 'react-media';
import Grid from 'material-ui/Grid';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import LoginForm from './form';

const Login = () =>
  <Media query="(max-width: 601px)">{
    matched =>
      <Dialog open={true} fullScreen={matched}>
        <DialogTitle>Authentificate</DialogTitle>
        <DialogContent>
          <LoginForm/>
        </DialogContent>
      </Dialog>
  }
  </Media>
  ;

export default Login;
