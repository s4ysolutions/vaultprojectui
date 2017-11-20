import React from 'react';
import Media from 'react-media';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import { observer, inject } from 'mobx-react';
import LoginForm from './form';

// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const LoginPage = inject('mobx')(observer(({ mobx: { ui } }) =>
  <Media query="(max-width: 601px)">
    {matched =>
      <Dialog open fullScreen={matched}>
        <DialogTitle>Authentificate</DialogTitle>
        <LoginForm />
        {ui.isQuerying && <LinearProgress />}
      </Dialog>
    }
  </Media>));

export default LoginPage;
