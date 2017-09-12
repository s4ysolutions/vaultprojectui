import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import LabelIcon from 'material-ui-icons/Label';
import FolderIcon from 'material-ui-icons/Folder';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import BackspaceIcon from 'material-ui-icons/Backspace';
import EditIcon from 'material-ui-icons/Edit';
import DoneIcon from 'material-ui-icons/Done';
import KVs from '../../../lib/kvs';
import { renderMuiTextField } from '../../../lib/mui';
import { match2path } from '../../../../lib';
import onMount from '../../../lib/onmount';
import {
  vaultSecretGenericList,
  vaultSecretGenericPut
} from '../../../../actions';
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const styles = () => ({
  icon: {
    display: 'flex',
    'align-items': 'center'
  }
});

const _FolderForm = ({ path, valid, submitting, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      disabled={submitting}
      name="name"
      label={path}
      helperText="Path"
      component={renderMuiTextField}
    />
  </form>
);

_FolderForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

const FolderForm = compose(
  reduxForm({
    form: 'secret_generic_folder',
    validate: values => (values.name && {}) || { name: 'Required' },
    onSubmit: (values, dispatch) =>
      new Promise((resolve, reject) => {
        dispatch(
          vaultSecretGenericPut(_(values).path, { ttl: '1h' }, resolve, reject)
        );
      })
  })
)(_FolderForm);

const _SecretGeneric = ({ folders, path, classes, handleSubmitFolder }) => (
  <KVs />
);

_SecretGeneric.propTypes = {
  path: PropTypes.string.isRequired,
  handleSubmitFolder: PropTypes.func.isRequired,
  folders: PropTypes.array
};

const SecretGeneric = compose(
  withRouter,
  connect(
    (state, { match, location }) => ({
      path: match2path(match, location),
      folders:
        state.vaultState.cache.secret.generic.folders[
          match2path(match, location)
        ]
    }),
    dispatch => ({
      dispatch,
      handleSubmitFolder: () => dispatch(submit('secret_generic_folder'))
    })
  ),
  onMount(({ dispatch, match, location }) =>
    dispatch(vaultSecretGenericList(match2path(match, location)))
  ),
  withStyles(styles)
)(_SecretGeneric);

export default SecretGeneric;
