// The magical one
var http = require('http');

// To read file
var fs = require('fs');

// Elegant async
var asynchronous = require('async');

// Entry point
var firstFunction = function(secondFunction) {

  // Read file and pass result
  fs.readFile(process.argv[2], 'utf8', function(error, data) {

    // When it goes south
    if (error) {

      // Pass it on
      return secondFunction(error);
    }

    // Call the next function with the result
    secondFunction(null, data);
  });
};

// Next to be called
var secondFunction = function(url, thirdFunction) {

  // Send request
  http.get(url, function(response) {

    // Full response
    var content = "";

    // When it starts to stream in
    response.on('data', function(data) {

      content += data.toString();
    });

    // When done
    response.on('end', function() {

      thirdFunction(null, content);
    });

    // In case of fire
    response.on('error', function(error) {

      // Pass it on
      thirdFunction(error);
    });
  });
};

// And finally
var thirdFunction = function(error, content) {

  if (error) {

    // Pass the blame
    console.log('It\'s your fault');
  }

  console.log(content);
};

// The waterfall
asynchronous.waterfall([firstFunction, secondFunction], thirdFunction);
