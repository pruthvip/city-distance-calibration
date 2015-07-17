var Distance = {};
var distances = [];
var index = 0;

//function to calculate the road distances between city latitude and longitude to all hotels
Distance.calculateDistances = function(origin, destinations, done){
    var destination = destinations[index];
    var _this = this;

    //fetching the road distance between 2 points from google
    var request= require('request');  
    request.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin.lat + ", " + origin.lon + " &destinations= " + destination.lat + "," + destination.lon  + "&mode=Car&language=en-EN", function(error, response, body){
    
    //parsing the distances result returned by google
    var jsonObject = JSON.parse(response.body);
    distances[index] = jsonObject.rows[0].elements[0].distance.value;
    distances[index] = distances[index]/1000;                           //converting distance to KM
    
    //recursively calling the calculateDistance function to fetch all the distances asynchronously
    if(index < destinations.length - 1){
        index++;
        _this.calculateDistances(origin, destinations, done);
    }
    else
        done(null, distances);
    });
};

module.exports = Distance;