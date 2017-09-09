import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

const backendListItems = () => 
  <List>
    <ListItem>
      <ListItemText primary="AWS" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Consul" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Cubbhole" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Databases" />
    </ListItem>
    <ListItem>
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
