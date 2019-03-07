const path = require('path');
const { promisify } = require('util');
//const Mp3File = require('./src/Classes/mp3filetest');

var fs = require('fs');

const pathmp3 = path.resolve('d:\\MP3\\');

console.clear();
console.log(pathmp3);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function getFiles(aPath) {
  return new Promise(resolve => {
    const aFiles=[];
    console.log('getFiles ',aPath)
    fs.readdir(aPath,{ withFileTypes: true }, async (err, files) => {
      console.log(files);
      await asyncForEach(files,async (dirent,index)=> {
        if (dirent.isDirectory()) {
          await getFiles(dirent.name);
        }
        else {
          aFiles.push(dirent.name)
        }
      })
      resolve(aFiles);
    });
  });
}

const main = async () => {
  const files = await getFiles(pathmp3);
  //console.log(files);

  console.error('DEJA FINI');

  process.stdout.write('\n');
};

main();

//console.log(getTags(files[2]));
//let tag = getTags(files[2]);
//console.log(tag);
