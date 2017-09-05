import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogActions } from 'material-ui/Dialog';
import { renderMuiTextField } from '../../lib/mui';
import { vaultAuthSetToken } from '../../../actions';

const styles = {
  token: {
    width: '20em'
  },
};

const _Login = ({ handleSubmit, classes }) =>
  <form onSubmit={handleSubmit}>
    <Field
      name="token"
      label="Token"
      helperText="A token issued by Vault"
      placeholder="1f7b305c-a051-1a7f-7d0e-0cd058b996f7"
      className={classes.token}
      component={renderMuiTextField}/>
    <DialogActions>
      <Button raised color="primary" type="submit">
        Authorize
      </Button>
    </DialogActions>
  </form>
;

_Login.propTypes = {
  handleSubmit: PropTypes.func,
  classes: PropTypes.object
};

export default compose (
  withStyles(styles),
  reduxForm({
    form: 'login',
    onSubmit: (values, dispatch) => dispatch(vaultAuthSetToken(values.token))
  }))(_Login);
