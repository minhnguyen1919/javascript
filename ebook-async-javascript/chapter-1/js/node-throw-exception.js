var myDomain = require('domain').create();
myDomain.run(function() {
  setTimeout(function() {
    throw new Error('Listen to me!')
  }, 50);
});
myDomain.on('error', function(err) {
  console.log('Error ignored!');
});