// Magic
var http = require('http');

// Respect
var asynchronous = require('async');

// The test
var condition = function(body) {

  body = String(body);

  return body.trim() !== 'meerkat';
};

// All the responses
var calls = 1;

// Fetch stuff to test
var fetch = function(cb) {

  // Get it
  http.get(process.argv[2], function(response) {

    // All of it
    var body = '';

    // Assemble
    response.on('data', function(data) {

      body += data.toString();
    });

    // Done
    response.on('end', function() {

      calls += 1;

      callback(null, ++calls);
    });
  });
};

// Finish it up
var callback = function(error, result) {

  // If something went wrong
  if (error) {
    console.log(error);
  }

  // But luckily
  console.log(result);
};

// While first do second then finish with third
asynchronous.whilst(condition, fetch, callback);
