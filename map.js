// The magical module
var http = require('http');

// The useful module
var asynchronous = require('async');

// Retrieve url content
var retrieve = function(item, cb) {

  // Try to retrieve
  http.get(item, function(response) {

    // Complete response
    var content = '';

    // When data streams in
    response.on('data', function(data) {

      // Add it up
      content += data.toString();
    });

    // When all is said and done
    response.on('end', function() {

      // Share result with the world
      return cb(null, content);
    });
  }).on('error', function(error) {
    console.error(error);
  });
};

// To handle results
var callback = function(error, result) {

  // If something went wrong
  if (error) {

    // Just speak it out
    console.log(error);
  }

  // Do the same for success
  console.log(result);
};

// Bring it all together
asynchronous.map([process.argv[2], process.argv[3]], retrieve, callback);
