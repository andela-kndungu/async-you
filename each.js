// Magic!
var http = require('http');

// The whole point
var asynchronous = require('async');

var testFunction = function(testCase, cb) {

  // The request parameters
  var opts = {
    hostname: testCase,
  };

  // The request object
  http.get(testCase, function(response) {

    // Do nothing, looking for errors not success
    response.on('data', function(chunk) {});

    // Do nothing still
    response.on('end', function() {

      return cb();
    });
  }).on('error', function(error) {

      cb(error);
    });
};

var callback = function(error) {

  // Proudly display error if present
  if (error) {

    console.log(error);
  }
};

// May the test begin!
asynchronous.each([process.argv[2], process.argv[3]], testFunction, callback);
