// For super functionality
var http = require('http');

// The cool one
var asynchronous = require('async');

// Star of the show
var red = function(current, item, cb) {

  // Full url
  var url = process.argv[2] + '?number=' + item;

  // Fetch value
  http.get(url, function(response) {

    var result = '';

    response.on('data', function(data) {

      result += data;
    });

    response.on('end', function() {

      result = Number(result);

      cb(null, current + result);
    });
  });
};

// When all is said and done
var after = function(error, result) {

  // Just display result
  console.log(result);
};

// Let's do this
asynchronous.reduce(['one', 'two', 'three'], 0, red, after);
