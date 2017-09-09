import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import Kv from './kv';

const _SecretGeneric = ({ match })=>
  <Switch>
    <Route path={match.path + '/kv'}><Kv/></Route>;
    <Route>
      <div>
        <Link to={match.path + '/kv'}>Add</Link>
        <Link to={match.path + '/kv/test/1'}>Edit</Link>
      </div>
    </Route>
  </Switch>;

_SecretGeneric.propTypes = {
  match: PropTypes.object
};

const SecretGeneric = compose (
  withRouter,
)(_SecretGeneric);

export default SecretGeneric;
