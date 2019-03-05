import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const { ipcRenderer } = require('electron');
const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  button: {},

  toolbar: theme.mixins.toolbar,
});

class AppDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, classes } = this.props;
    //console.log('AppDrawer - render => isOpen ', isOpen);
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.content}>
          <Button variant="contained" color="primary" fullWidth onClick={() => {ipcRenderer.send('open-folder')}}>
            Répertoire
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AppDrawer);
