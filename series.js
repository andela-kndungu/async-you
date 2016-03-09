// The one
var http = require('http');

// For elegant async
var asynchronous = require('async');

// One of them
var firstFunction = function(callback) {

  http.get(process.argv[2], function(response) {

    // All content
    var content = '';

    // As it comes in
    response.on('data', function(data) {

      // Add it up
      content += data.toString();
    });

    // When it's all over
    response.on('end', function() {

      // Share it with the world
      callback(null, content);
    });
  });
};

// Another
var secondFunction = function(callback) {

  http.get(process.argv[3], function(response) {

    // All content
    var content = '';

    // As it comes in
    response.on('data', function(data) {

      // Add it up
      content += data.toString();
    });

    // When it's all over
    response.on('end', function() {

      // Share it with the world
      callback(null, content);
    });
  });
};

// Will handle results
var callback = function(error, content) {

  if (error){

    // Inform
    console.log(error);
  }

  console.log(content);
};

asynchronous.series({requestOne: firstFunction, requestTwo:secondFunction}, callback);
