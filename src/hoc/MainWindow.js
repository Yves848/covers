import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuAppBar from '../components/Menu/AppBar';
import AppDrawer from '../components/Menu/AppDrawer';
import { CssBaseline } from '@material-ui/core';
import MP3List from '../components/Lists/mp3List';
const { dialog, ipcMain } = require('electron').remote;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 6,
  },
  toolbar: theme.mixins.toolbar,
});

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      folder: ''
    };
  }

  openFolder = async (events, args) => {
    const folders = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (folders && folders.length > 0) {
      //console.log(folders)
      this.setState({
        folder: folders[0],
      });
    }
  };

  componentDidMount = () => {
    ipcMain.on('open-folder', (event, args) => this.openFolder(event, args));
  };

  handleDrawerOpen = () => {
    const { isDrawerOpen } = this.state;
    //console.log("ManWindow - handleDrawerOpen => isDrawerOpen ", isDrawerOpen);
    this.setState({
      isDrawerOpen: !isDrawerOpen,
    });
  };
  

  render() {
    const { classes } = this.props;
    const { folder } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MenuAppBar handleDrawerOpen={this.handleDrawerOpen} />

        <AppDrawer
          isOpen={this.state.isDrawerOpen}
          handleDrawer={this.handleDrawerOpen}
        />
        <main className={classes.content}>
          <MP3List folder={folder}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(MainView);
