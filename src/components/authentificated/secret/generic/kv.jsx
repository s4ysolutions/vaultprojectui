import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
import { renderMuiTextField } from '../../../lib/mui';
import Errors from '../../../lib/errors';
import { vaultSecretGenericPut } from '../../../../actions';
//
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const styles = {};
const _KvForm = ({
  path,
  handleSubmit,
  valid,
  submitting,
  isAllowedMount,
  mount
}) => (
  <form onSubmit={handleSubmit} noValidate className="login_form">
    <DialogContent>
      {(isAllowedMount && (
        <Field
          required
          name="mount"
          label="Mount point"
          helperText="letters, digits and underscores"
          placeholder="/secret"
          component={renderMuiTextField}
        />
      )) || <Typography>Mount point: {mount}</Typography>}
      <br />
      {path && <Typography>{path}</Typography>}
      {!path && (
        <Field
          required
          name="path"
          label="Path to key/value pair(s)"
          helperText="A path to key-value pair, not including /secret/generic"
          placeholder="/secret/generic"
          component={renderMuiTextField}
        />
      )}
      <br />
      <Field
        required
        name="key"
        label="Key"
        helperText="letters, digits and underscores"
        placeholder="Key"
        component={renderMuiTextField}
      />
      <br />
      <Field
        required
        name="value"
        label="Value"
        helperText="letters, digits and underscores"
        placeholder="Value"
        component={renderMuiTextField}
      />
      <br />
    </DialogContent>
    <DialogActions>
      <Errors />
      <Button
        raised
        color="primary"
        type="submit"
        disabled={!valid || submitting}
      >
        Submit
      </Button>
      <br />
    </DialogActions>
  </form>
);

_KvForm.propTypes = {
  mount: PropTypes.string,
  path: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isAllowedMount: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const KvForm = compose(
  withStyles(styles),
  withRouter,
  connect((state, { match: { path }, location: { pathname } }) => ({
    path: pathname.slice(path.length),
    errors: state.messages.vaultErrors,
    isAllowedMount: false,
    mount: state.vault.secret.generic.mount,
    initialValues: {
      key: '',
      value: ''
    }
  })),
  reduxForm({
    form: 'secret_generic_kv',
    validate: values => {
      void(values);
      const errors = {};
      return errors;
    },
    onSubmit: (values, dispatch) =>
      new Promise((resolve, reject) => {
        dispatch(
          vaultSecretGenericPut(
            values.path,
            { [values.key]: values.value },
            resolve,
            reject
          )
        );
      })
  })
)(_KvForm);

export default KvForm;
