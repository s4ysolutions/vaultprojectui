import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import KVs from '../../../lib/kvs';
import { match2path } from '../../../../lib';
import onMount from '../../../lib/onmount';
import {
  vaultSecretGenericGet,
  vaultSecretGenericPut
} from '../../../../actions';
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

const _SecretGeneric = ({ submitKVs, errors }) =>
  <Grid container justify="center">
    <Grid item xs={12} sm={10} md={8} lg={6}>
      {errors.map((error, i) =>
        <Typography key={md5(error)} color="accent">
          {error}
        </Typography>)}
      <KVs submitKVs={submitKVs} />
    </Grid>
  </Grid>
;

_SecretGeneric.propTypes = {
  submitKVs: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
};

const SecretGeneric = compose(
  withRouter,
  connect((state, { match, location }) => ({
    path: `${match2path(match, location)}x`,
    errors: state.messages.errors
  })),
  connect(
    () => ({}),
    (dispatch, { path }) => ({ submitKVs: kvs => dispatch(vaultSecretGenericPut(path, kvs)) })
  ),
  onMount(({ dispatch, path }) => dispatch(vaultSecretGenericGet(path)))
)(_SecretGeneric);

export default SecretGeneric;
