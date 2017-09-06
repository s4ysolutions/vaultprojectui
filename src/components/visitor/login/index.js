import React from 'react';
import { PropTypes } from 'prop-types';
import Media from 'react-media';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import LoginForm from './form';

const _ = o => (console.log(o), o);

const _LoginPage = ({ isQuerying }) =>
  <Media query="(max-width: 601px)">{
    matched =>
      <Dialog open={true} fullScreen={matched}>
        <DialogTitle>Authentificate</DialogTitle>
        <LoginForm/>
        {isQuerying && <LinearProgress/>}
      </Dialog>
  }
  </Media>
  ;

_LoginPage.propTypes = {
  isQuerying: PropTypes.bool
};

const LoginPage = connect(state=>({ isQuerying: state.transient.isVaultQuerying }))(_LoginPage);
export default LoginPage;
