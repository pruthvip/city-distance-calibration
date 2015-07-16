
  var distances=[];
  var calculateDistance = function(origin,destinations,index,callback){
    var destination = destinations[index];
    var request= require('request');  
    //console.log(origin);
    request.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin.lat + ", " + origin.lon + " &destinations= " + destination.lat + "," + destination.lon  + "&mode=Car&language=fr-FR", function(error,response,body){
    var jsonObject = JSON.parse(response.body);
    distances[index]=jsonObject.rows[0].elements[0].distance.value;
    //console.log(distances[i]);
    if(index<destinations.length-1)
      calculateDistance(origin,destinations,index+1,callback);
    else
      callback(null);
    });
  }

var calculateDistances= function(originCity,destinations,callback){
  var index=0;
    calculateDistance(originCity,destinations,index,function(err){
      callback(err,distances);
    });
}

chennai =
        {
            lat:12.9667,
            lon:77.5667
        };

        hotels =[
            {lat:13.442781448364258,lon:74.73983001708984},{lat:11.651593208312988,lon:78.16067504882812},{lat:14.796710968017578,lon:74.15335083007812}
            ];

calculateDistances(chennai,hotels,function(err){
          console.log(distances);
        });