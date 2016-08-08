var async = require('async');
var fs = require('fs');
process.chdir('recipes'); // change the working directory
var concatenation = '';

// Synchronous readdir(3). Returns an array of filenames excluding '.' and '..'.
var dirContents = fs.readdirSync('.');
async.filter(dirContents, isFilename, function(filenames) {
  async.forEachSeries(filenames, readAndConcat, onComplete);
});
function isFilename(filename, callback) {
  /*
   *Asynchronous stat(2). The callback gets two arguments (err, stats) 
   *where stats is a fs.Stats object. See the fs.Stats section below 
   *for more information.
   */
  fs.stat(filename, function(err, stats) {
    if (err) throw err;
    callback(stats.isFile());
  });
}
function readAndConcat(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, fileContents) {
    if (err) return callback(err);
    concatenation += fileContents;
    callback();
  });
}
function onComplete(err) {
  if (err) throw err;
  console.log(concatenation);
}

