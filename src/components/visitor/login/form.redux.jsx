import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
import { renderMuiTextField } from '../../lib/mui';
import Errors from '../../lib/errors';
import {
  vaultAuthSetToken,
  vaultSetURL,
  vaultAuthLookupSelf
} from '../../../actions';

// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const styles = {
  token: {
    width: '20em'
  }
};

const _LoginForm = ({ handleSubmit, classes, valid, submitting }) => (
  <form onSubmit={handleSubmit} noValidate className="login_form">
    <DialogContent>
      <Field
        required
        name="url"
        label="Vault URI"
        helperText="A protocol (HTTPS by default) and  hostname"
        placeholder="http://localhost:8200"
        className={classes.token}
        component={renderMuiTextField}
      />
      <br />
      <br />
      <Field
        required
        name="token"
        label="Token"
        helperText="A Token Issued by Vault"
        placeholder="1f7b305c-a051-1a7f-7d0e-0cd058b996f7"
        className={classes.token}
        component={renderMuiTextField}
      />
    </DialogContent>
    <DialogActions>
      <Errors />
      <Button
        raised
        color="primary"
        type="submit"
        disabled={!valid || submitting}
      >
        Authentificate
      </Button>
      <br />
    </DialogActions>
  </form>
);

_LoginForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(state => ({
    initialValues: {
      url: state.vaultConfig.url,
      token: state.vaultConfig.auth.token
    }
  })),
  withRouter,
  reduxForm({
    form: 'login',
    validate: values => {
      const errors = {};
      if (!values.url) {
        errors.url = 'Required';
      } else if (
        !values.url.match(
          /^(https?:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9][0-9]+)?$/
        )
      ) {
        errors.url = 'Invalid format';
      }
      if (!values.token) {
        errors.token = 'Required';
      }
      return errors;
    },
    onSubmit: (values, dispatch, { history }) =>
      new Promise((resolve, reject) => {
        dispatch(vaultSetURL(values.url));
        dispatch(vaultAuthSetToken(values.token));
        dispatch(vaultAuthLookupSelf(resolve, reject));
      }).then(() => history.replace('/'))
  })
)(_LoginForm);
