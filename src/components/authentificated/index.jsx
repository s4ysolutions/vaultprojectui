//[[[  imports
import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ExitToApp from 'material-ui-icons/ExitToApp';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Secrets, { SecretsDrawer, SecretsTitle } from './secrets';
import Polices, { PolicesDrawer, PolicesTitle } from './polices';
import Grants, { GrantsDrawer, GrantsTitle } from './grants';

import { uiDrawerOpen, uiDrawerClose, vaultExit } from '../../actions';

const _ = o=>(console.log(o), o);
//]]]

//[[[ Styles
const drawerWidth = 240;
const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});
//]]]
// [[[ _Authentificated
/*
            <Route path="/secrets"><span>AAAA</span></Route>
            <Route path="/polices"><PolicesTitle/></Route>
            <Route path="/grants"><GrantsTitle/></Route>


*/
const _Authentificated = ({ lastTab, classes, handleDrawerOpen, handleDrawerClose, isDrawerOpen, handleExit }) => 
  <div className={classes.appFrame}>
    <AppBar className={classNames(classes.appBar, isDrawerOpen && classes.appBarShift)}>
      <Toolbar disableGutters={!isDrawerOpen}>
        <IconButton
          color="contrast"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, isDrawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Switch>
          <Route path="/secrets"><SecretsTitle/></Route>
          <Route path="/polices"><PolicesTitle/></Route>
          <Route path="/grants"><GrantsTitle/></Route>
        </Switch>
      </Toolbar>
    </AppBar>
    <Drawer
      type="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={isDrawerOpen}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Switch>
          <Route path="/secrets"><SecretsDrawer classes={classes}/></Route>
          <Route path="/polices"><PolicesDrawer classes={classes}/></Route>
          <Route path="/grants"><GrantsDrawer classes={classes}/></Route>
        </Switch>
        <Divider />
        <List>
          <ListItem button onClick={handleExit}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
    <main className={classNames(classes.content, isDrawerOpen && classes.contentShift)}>
      <Switch>
        <Route path="/secrets"><Secrets/></Route>
        <Route path="/polices"><Polices/></Route>
        <Route path="/grants"><Grants/></Route>
        <Redirect from="/" to={lastTab}/>
      </Switch>
    </main>
  </div>;

_Authentificated.propTypes = {
  classes: PropTypes.object.isRequired,
  lastTab: PropTypes.string.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
};
//]]]
//[[[ Authentificated
const Authentificated = compose(
  withStyles(styles),
  withRouter,
  connect(
    state=>({
      isDrawerOpen: state.transient.isDrawerOpen,
      lastTab: state.persistent.lastTab
    }),
    dispatch=>({
      handleExit: ()=>dispatch(vaultExit()),
      handleDrawerOpen: ()=>dispatch(uiDrawerOpen()),
      handleDrawerClose: ()=>dispatch(uiDrawerClose())
    }))
)(_Authentificated);
//]]]
export default Authentificated;
