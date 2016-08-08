var async = require('async');
function worker(data, callback) {
  setTimeout(callback, data);
}
var concurrency = 2;
var queue = async.queue(worker, concurrency);
var start = new Date;
queue.drain = function() {
  console.log('Completed in ' + (new Date - start) + 'ms');
};
queue.push([100, 200, 300]);
