import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import SecretGeneric from './generic';

const _ = o=>(console.log(o), o);// eslint-disable-line no-unused-vars, no-console

const _SecretsDrawer = ({
  classes,
  handleConsulBackendTapped,
  handleGenericBackendTapped
})=>
  <List className={classes.list}>
    <ListItem>
      <ListItemText primary="AWS" />
    </ListItem>
    <ListItem button onClick={handleConsulBackendTapped}>
      <ListItemText primary="Consul"/>
    </ListItem>
    <ListItem>
      <ListItemText primary="Cubbhole" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Databases" />
    </ListItem>
    <ListItem button onClick={handleGenericBackendTapped}>
      <ListItemText primary="Generic" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Identity" />
    </ListItem>
    <ListItem>
      <ListItemText primary="PKI" />
    </ListItem>
    <ListItem>
      <ListItemText primary="RabbitMQ" />
    </ListItem>
    <ListItem>
      <ListItemText primary="SSH" />
    </ListItem>
    <ListItem>
      <ListItemText primary="TOTP" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Transit" />
    </ListItem>
  </List>;

_SecretsDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleGenericBackendTapped: PropTypes.func.isRequired,
  handleConsulBackendTapped: PropTypes.func.isRequired
};

export const SecretsDrawer = compose(
  withRouter,
  connect(
    state=>({ }),
    (dispatch, { history, match })=>({
      handleGenericBackendTapped: ()=>history.push(match.path + '/generic'),
      handleConsulBackendTapped: ()=>history.push(match.path + '/consul')
    }))
)(_SecretsDrawer);


export const SecretsTitle = ()=> <Typography type="title" color="inherit">Secrets</Typography>;

const _Secret = () => 
  <Switch>
    <Route path="/secret/generic"><SecretGeneric/></Route>
    <Route path="/secret/consul"><div>Consul</div></Route>
  </Switch>;


const Secret = _Secret;

export default Secret;
