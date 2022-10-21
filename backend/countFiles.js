const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

const PATH = "./assets"

function watcher() {
// Initialize watcher.
const watcher = chokidar.watch(PATH, { persistent: true });
 
// Add event listeners.
watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on ('add', path => async fileName => {
    fileName = (`${path.split("/")[1]}`)
    return fileName
  })
 

};


module.exports = { watcher };