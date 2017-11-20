/* eslint-disble no-alert, no-console */
import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import MobxMaterialForm from '../../../lib/mobx-material-form';
import validatorjs from 'validatorjs';

import TextField from '../../inputs/text-field';
import Errors from '../../lib/errors';
//
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const plugins = { dvr: validatorjs };
const styles = { token: { width: '20em' } };

const fields = {
  url: {
    label: 'Vault URL',
    //helperText: 'A protocol (HTTPS by default) and  hostname',
    placeholder: 'http://localhost:8200',
    rules: 'required|url',
  },
  token: {
    label: 'Token',
    //helperText: 'A Token Issued by Vault',
    placeholder: '1f7b305c-a051-1a7f-7d0e-0cd058b996f7',
    rules: 'required|string|between:5,25',
  }
};

const hooks = {
  onSuccess (form) {
    alert('Form is valid! Send the request here.');
    // Get field values
    console.log('Form Values!', form.values());
  },

  onError (form) {
    // Get all form errors
    console.log('All form errors', form.errors());
    // Invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
};

const formLogin = new MobxMaterialForm(
  { fields },
  {
    plugins,
    hooks
  }
);

autorun(() => console.log(formLogin.fields));

const LoginForm = observer(({ classes, form }) =>
  // eslint-disable-next-line  react/jsx-handler-names
  <form onSubmit={form.onSubmit} noValidate className="login_form">
    <DialogContent>
      <TextField className={classes.token} field={form.$('url')}/>
      <TextField className={classes.token} field={form.$('token')} />
    </DialogContent>
    <DialogActions>
      <Errors />
      <Button
        raised
        color="primary"
        type="submit"
        disabled={!form.isValid || form.submitting || form.validating}
      >
        Authentificate
      </Button>
      <br />
    </DialogActions>
  </form>);
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

// Export default withStyles(styles)(observer(props=><LoginForm form={formLogin} {..._(props)}/>));
export default withStyles(styles)(props =>
  <LoginForm form={formLogin} {...props} />);

/*
 * Export default compose(
 * withStyles(styles),
 * observer,
 * props => <LoginForm form={formLogin} {..._(props)}/>,
 * );
 */
/*
 * Export default compose(
 * withStyles(styles),
 * connect(state => ({
 * initialValues: {
 * url: state.vaultConfig.url,
 * token: state.vaultConfig.auth.token
 * }
 * })),
 * withRouter,
 * reduxForm({
 * form: 'login',
 * validate: values => {
 * const errors = {};
 * if (!values.url) {
 * errors.url = 'Required';
 * } else if (
 * !values.url.match(
 * /^(https?:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9][0-9]+)?$/
 * )
 * ) {
 * errors.url = 'Invalid format';
 * }
 * if (!values.token) {
 * errors.token = 'Required';
 * }
 * return errors;
 * },
 * onSubmit: (values, dispatch, { history }) =>
 * new Promise((resolve, reject) => {
 * dispatch(vaultSetURL(values.url));
 * dispatch(vaultAuthSetToken(values.token));
 * dispatch(vaultAuthLookupSelf(resolve, reject));
 * }).then(() => history.replace('/'))
 * })
 * )(_LoginForm);
 */
