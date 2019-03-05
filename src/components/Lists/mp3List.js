import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
const { Mp3File } = require("../../Classes/mp3file");
const fs = require("fs");
const path = require("path");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
class MP3List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  fillList = async folder => {
    const files = fs.readdirSync(path.resolve(folder));
    if (files) {
      await asyncForEach(files, async (file, i) => {
        const list = files.map((file, index) => {
          const mp3 = new Mp3File(folder, file, index);
          const tags = await mp3.getTags2;
          console.log(tags);
          return mp3;
        });
        this.setState({
          list
        });
      });
    }
  };

  componentDidMount() {
    const { folder } = this.props;
    console.log(folder);
    if (folder.trim() !== "") {
      this.fillList(folder);
    }
  }

  componentDidUpdate(prevProps) {
    const { folder } = this.props;

    if (folder.trim() !== "" && folder !== prevProps.folder) {
      this.fillList(folder);
    }
  }

  render() {
    const { list } = this.state;
    let files = "VIDE";
    if (list) {
      console.log(list);
      files = list.map((item, index) => {
        return <p key={index}>{item.mp3.fileName}</p>;
      });
    }
    return <div>{files}</div>;
  }
}

export default MP3List;
