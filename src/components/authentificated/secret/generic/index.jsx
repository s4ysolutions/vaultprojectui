import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import onMount from '../../../lib/onmount';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import FolderIcon from 'material-ui-icons/Folder';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import Vault from '../../../../react-vault';
import Kv from './kv';
import { match2path } from '../../../../lib';
import { vaultSecretGenericList } from '../../../actions';

const _SecretGeneric = () => (
  <Table>
    <TableBody>
      {this.props.folders &&
        this.props.folders.map((folder, i) => (
          <TableRow key={'f' + i}>
            <TableCell>
              <FolderIcon />
            </TableCell>
            <TableCell>{folder}</TableCell>
            <TableCell>
              <AddIcon />
            </TableCell>
            <TableCell>
              <EditIcon />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

_SecretGeneric.propTypes = {
  folders: PropTypes.array //.isRequired
};
const SecretGeneric = compose(
  withRouter,
  connect(),
  onMount(({ dispatch, match, location }) =>
    dispatch(vaultSecretGenericList(match2path(match, location)))
  )
)(_SecretGeneric);

export default SecretGeneric;
