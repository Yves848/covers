const NodeID3 = require('node-id3');
const path = require('path');
const fs = require('fs');
const jsmediatags = require('jsmediatags');
const mp3file = require('./mp3file.json');

function Mp3File(pathName = '', fileName = '', index = -1) {
    this.mp3 = {...mp3file}
    this.mp3.pathName = pathName;
    this.mp3.fileName = fileName;
    this.mp3.index = index;


  }

const  setJson = json => {
    this.json = { ...json };
  };

Mp3File.getTags2 = async => {
    return new Promise(resolve => {
      let filename = path.resolve(mp3.pathName, mp3.fileName);
      new jsmediatags.Reader(filename).setTagsToRead(['title', 'artist']).read({
        onSuccess: tag => {
          resolve(tag.tags);
        },
      });
    });
  };

Mp3File.getTags = (obj) => {
    return new Promise(resolve => {
      let filename = path.resolve(obj.pathName, obj.fileName);
      new jsmediatags.Reader(filename).setTagsToRead(['title', 'artist','picture']).read({
        onSuccess: tag => {
          resolve(tag.tags);
        },
        onError: error => {
          resolve(null)
        }
      });
    })
  };

const  getPicture = async (object, image) => {
    const url = await this.Picture(object);
    return url;
  };

const  writePicture = async (Object,image) => {
    return new Promise((resolve, reject) => {
      const imageName = path.resolve('./temp.jpg');
      fs.writeFileSync(imageName,image)
      const tags = {
        artist: Object.artist,
        title: Object.title,
        APIC: imageName
      }
      NodeID3.update(tags, path.resolve(Object.pathName, Object.fileName), (err) => {
        console.log(err);
      });
      resolve();
    })

  }

const  Picture = async obj => {
    return new Promise((resolve, reject) => {
      let filename = path.resolve(this.pathName, this.fileName);
      new jsmediatags.Reader(filename).setTagsToRead(['title', 'picture']).read({
        onSuccess: tag => {
          var arrayBufferView = new Uint8Array(tag.tags.picture.data);
          var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
          var urlCreator = window.URL || window.webkitURL;
          resolve(urlCreator.createObjectURL(blob));
        },
        onError: error => {
          console.log('Picture error', error);
          reject(error);
        },
      });
    });
  };

const  getImgUrl = obj => {
    var arrayBufferView = new Uint8Array(obj.picture.data);
    var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
    var urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

export {Mp3File}
