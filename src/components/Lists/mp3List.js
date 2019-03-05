import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Mp3ListItem from '../detail/Mp3ListItem';
import FillProgress from '../Misc/FillProgress';

const { Mp3File, asyncForEach } = require('../../Classes/mp3file');
const fs = require('fs');
const path = require('path');

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: '200px',
    height: '200px',
  },
  content: {
    flexGrow: 1,
  },
  nothing: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});
class MP3List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filling: false,
      iProgress: 0,
     
    };
  }

  fillList = async folder => {
    this.setState({
      iProgress: 0,
      filling: true,
      list: [],
    });
    let files = [];
    try {
      const fileList = fs.readdirSync(path.resolve(folder));
      files = fileList.filter(file => {
        return file.indexOf('.mp3') >= 0;
      });
    } catch (error) {
      console.log(error);
    }
    let iTotal = files.length - 1;
    const list = [];
    if (files && files.length > 0) {
      await asyncForEach(files, async (file, index) => {
        const percent = Math.ceil((index / iTotal) * 100);

        if (percent % 5 === 0) {
          //console.log(percent)
          this.onProgress(percent);
        }
        const mp3 = new Mp3File(folder, file, index);
        try {
          await mp3.tags();
        } catch (error) {}

        list.push(mp3);
      });
      this.setState({
        list,
        filling: false,
        iProgress: 0,
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

  onProgress = i => {
    this.setState({
      iProgress: i,
    });
  };

  

  render() {
    const { list, filling, iProgress } = this.state;
    const { classes, folder } = this.props;
    const isFiles = list && list.length > 0;
    let files = 'VIDE';
    if (isFiles) {
      //console.log('render - list',list);
      files = list.map((item, index) => {
        return <Mp3ListItem key={index} mp3={item.mp3} />;
      });
    }
    return !isFiles ? (
      filling ? (
        <FillProgress iProgress={iProgress} folder={folder} />
      ) : (
        <div className={classes.nothing}>
          <h1>Choisir un répertoire ..... </h1>
        </div>
      )
    ) : (
      <div className={classes.content}>
        
        <List className={classes.root}>{files}</List>
      </div>
    );
  }
}

export default withStyles(styles)(MP3List);
