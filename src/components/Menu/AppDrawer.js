import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button"
const drawerWidth = 240;

const styles = theme =>( {
  list: {
    width: 250
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 8
  },
  drawerPaper: {
    width: drawerWidth
  },

  toolbar: theme.mixins.toolbar
});

class AppDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, classes } = this.props;
    console.log("AppDrawer - render => isOpen ", isOpen);
    return (
      <Drawer
      className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.content}>
          <Button variant="extendedFab" color="primary" style={{ marginBottom: '5px'}}>Répertoire</Button>
          <Button>Répertoire</Button>
          <Button>Répertoire</Button>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AppDrawer);
