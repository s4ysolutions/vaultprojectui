import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import KVs from '../../../lib/kvs';
import { renderMuiTextField } from '../../../lib/mui';
import { match2path } from '../../../../lib';
import onMount from '../../../lib/onmount';
import {
  vaultSecretGenericList,
  vaultSecretGenericPut
} from '../../../../actions';
// eslint-disable-next-line no-console, no-unused-vars
const _ = (o) => (console.log(o), o);

const _SecretGeneric = () => <KVs />;

/*
_SecretGeneric.propTypes = {
  path: PropTypes.string.isRequired,
  handleSubmitFolder: PropTypes.func.isRequired,
  folders: PropTypes.array
};
*/
const SecretGeneric = compose(withRouter
  /* ,
  connect(
    (state, { match, location }) => ({ path: match2path(match, location) }),
    (dispatch) => ({
      dispatch,
      handleSubmitFolder: () => dispatch(submit('secret_generic_folder'))
    })
  )  ,
  onMount(({ dispatch, match, location }) =>
    dispatch(vaultSecretGenericList(match2path(match, location)))),
    */
)(_SecretGeneric);

export default SecretGeneric;
