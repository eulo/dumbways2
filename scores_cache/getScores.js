#!/usr/bin/env node

var http = require('http');
var fs = require('fs');

var url = "http://dumbways.millipede.com.au/leaderboard/"
  , endpoints = ['freezerville', 'drowntown', 'dumbest', 'dumbdome']
  , finalData = []; 

var writeToFile = function() {
  fs.writeFile("./scores", finalData, function(err) {
    //JSON.stringify(json)
    if (err)
      console.log(err);
    else
      console.log("Saved");
  });
};

endpoints.forEach(function(el, i, arr) {

  http.get(url + el, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function(err) {

      if (!body.length) {
        console.log('Failed on: ', el);
        return;
      }

      var json;
      try {
        // attempt to decode
        json = JSON.parse(body);
      
      } catch(e) {
        // JSONP assumed, remove wrapper
        var startPos = body.indexOf('({')
          , endPos = body.indexOf('})');
        json = body.substring(startPos+1, endPos+1);
        if (json.length)
          finalData.push('var ' + el + ' = ' + json + '; ');
      }
      
      if (finalData.length === arr.length)
        writeToFile();

    });
  });

});

