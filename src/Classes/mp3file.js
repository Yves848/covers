const NodeID3 = require('node-id3');
const path = require('path');
const fs = require('fs');
const jsmediatags = require('jsmediatags');
const mp3file = require('./mp3file.json');
import noCover from '../../docs/images/nocover.jpg';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
class Mp3File {
  constructor(pathName = '', fileName = '', index = -1) {
    this.mp3 = { ...mp3file };
    this.mp3.pathName = pathName;
    this.mp3.fileName = fileName;
    this.mp3.index = index;
  }

  async tags() {
    return new Promise((resolve, reject) => {
      let filename = path.resolve(this.mp3.pathName, this.mp3.fileName);
      new jsmediatags.Reader(filename)
        .setTagsToRead(['title', 'artist', 'picture'])
        .read({
          onSuccess: tag => {
            this.mp3.tags = { ...tag.tags };
            let arrayBufferView;
            if (tag.tags.picture) {
              this.mp3.hasCover = true;
              arrayBufferView = new Uint8Array(tag.tags.picture.data);
              var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
              var urlCreator = window.URL || window.webkitURL;
              this.mp3.imageUrl = urlCreator.createObjectURL(blob);
            } else {
              this.mp3.hasCover = false;
              this.mp3.imageUrl = noCover;
            }
            resolve();
          },
          onError: error => {
            this.mp3.tags = {};
            this.mp3.hasCover = false;
            this.mp3.imageUrl = noCover;
            reject();
          },
        });
    });
  }

  async getPicture() {
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
  }
}

const getPicture = async (object, image) => {
  const url = await this.Picture(object);
  return url;
};

const writePicture = async (Object, image) => {
  return new Promise((resolve, reject) => {
    const imageName = path.resolve('./temp.jpg');
    fs.writeFileSync(imageName, image);
    const tags = {
      artist: Object.artist,
      title: Object.title,
      APIC: imageName,
    };
    NodeID3.update(tags, path.resolve(Object.pathName, Object.fileName), err => {
      console.log(err);
    });
    resolve();
  });
};

const Picture = async obj => {
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

const getImgUrl = obj => {
  var arrayBufferView = new Uint8Array(obj.picture.data);
  var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
  var urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
};

export { Mp3File, asyncForEach };
