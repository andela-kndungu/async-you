// The hallowed one
var http = require('http');

// The cool one
var asynchronous = require('async');

// Post it
var post = function(n, next) {

  // The parameters
  var opts = {
    method: 'POST',
    hostname: process.argv[2],
    port: Number(process.argv[3]),
    path: '/users/create'
  };

  // What to send
  var body = {
    user_id: n + 1
  };
  body = JSON.stringify(body);

  // Make the request
  var req = http.request(opts);
  req.write(body);
  req.end();
  next(null, body);

};

// When all is said and done
var callback = function() {

  var options = {
    port: Number(process.argv[3]),
    path: '/users',
    hostname: process.argv[2]
  };

  // See what we have
  http.get(options, function(response) {

    // The whole response
    var content = '';

    // As it comes in
    response.on('data', function(data) {

      // Add it up
      content += data.toString();
    });

    // When done
    response.on('end', function() {

      // Proudly display
      console.log(content);
    });
    // When done
    response.on('error', function(error) {

      // Proudly display
      console.log(error);
    });

  }).on('error', function(error) {
    console.log(error);
  });
};

asynchronous.times(5, post, callback);
