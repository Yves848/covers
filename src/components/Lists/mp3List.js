import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
const { Mp3File,asyncForEach } = require('../../Classes/mp3file');
const fs = require('fs');
const path = require('path');



const styles = theme => ({
  
  image:{
    width: '200px',
    height: '200px'
  }
});
class MP3List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  fillList = async folder => {
    let files = [];
    try {
      files = fs.readdirSync(path.resolve(folder));
    } catch (error) {
      console.log(error);
    }

    const list = [];
    if (files && files.length > 0) {
      await asyncForEach(files, async (file, index) => {
        const mp3 = new Mp3File(folder, file, index);
        try {
          await mp3.tags();
        } catch (error) {}
        list.push(mp3);
      });
      this.setState({
        list,
      });
    }
  };

  componentDidMount() {
    const { folder } = this.props;
    if (folder.trim() !== '') {
      this.fillList(folder);
    }
  }

  componentDidUpdate = async prevProps => {
    const { folder } = this.props;

    if (folder.trim() !== '' && folder !== prevProps.folder) {
      await this.fillList(folder);
    }
  };

  render() {
    const { list } = this.state;
    const {classes} = this.props;

    let files = 'VIDE';
    if (list) {
      //console.log('render - list',list);
      files = list.map((item, index) => {
        return (
          <div key={index}>
            <p>
              {item.mp3.fileName} - {item.mp3.hasCover ? 'cover' : 'no cover'}
            </p>
            <img className={classes.image} src={item.mp3.imageUrl}></img>
          </div>
        );
      });
    }
    return <div>{files}</div>;
  }
}

export default withStyles(styles)(MP3List);
