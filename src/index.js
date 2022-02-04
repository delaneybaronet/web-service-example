/*
Measures the distance between to places. 
The distance is calcualted using latitude and longitude.
The distance is measured in kilometers.
Input URL:
https://jtc8v.sse.codesandbox.io/?latA=29&lonA=-95&latB=32.6&lonB=-96.7
Houston, Texas to Dallas, Texas 
Output distance: 439km
*/

var http = require("http");
http
  .createServer(function (request, response) {
    // Read the URL used to contact the web service and extract the latitude and longitude values, saving them each to a variable
    var requestUrl = new URL("http://" + request.headers.host + request.url);
    var latA = requestUrl.searchParams.get("latA");
    var lonA = requestUrl.searchParams.get("lonA");
    var latB = requestUrl.searchParams.get("latB");
    var lonB = requestUrl.searchParams.get("lonB");

    // Use the spherical law of cosines formula to calculate distance along the surface of a sphere. It is not the most accurate method for Earth, but it is good enough. Source: https://www.movable-type.co.uk/scripts/latlong.html
    var φ1 = (latA * Math.PI) / 180;
    var φ2 = (latB * Math.PI) / 180;
    var Δλ = ((lonB - lonA) * Math.PI) / 180;
    var R = 6371; // Earth's radius in km
    var distance =
      Math.acos(
        Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
      ) * R;

    // Output the calculated distance value to the client and complete the execution of the program.
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.write('{"distance": ' + distance.toFixed(2) + "}");
    response.end();
  })
  .listen(8080);
