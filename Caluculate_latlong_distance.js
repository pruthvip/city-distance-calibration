/* 
	input = lat long of city 1 and city 2
	output = latlong distance between city 1 and city 2

 	source = http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points

 	Using harvensine formula
 	https://en.wikipedia.org/wiki/Haversine_formula

 */

var calculateLatlongDistance = function (origin,destination)
{

	//input


  var radiusOfEarth = 6371; // Radius of the earth in km
  var dLat = deg2rad(destination.lat-origin.lat);  // deg2rad below
  var dLon = deg2rad(destination.lon-origin.lon); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(origin.lat)) * Math.cos(deg2rad(destination.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var latlonDistance = radiusOfEarth  * c; // Distance in km
  //console.log(latlonDistance);
  return latlonDistance;
};

function deg2rad(deg) {           // changing degree to randian
  return deg * (Math.PI/180);



};

var calculateLatlongDistances = function(originCity,destinations)
{
	var displacements=[];

	/*
		caluculate displacement for each city
	    push in the destination vector
	*/

	//looping through each city an getting the city displacement
	for(i=0;i<destinations.length;i++)
	{
		//console.log(destinations[i]);
		displacements[i]=calculateLatlongDistance(originCity,destinations[i]);
	}

	return displacements;


};



//console.log(calculateLatlongDistances(chennai,hotels));



//cheking using dummy variable
		chennai =
		{
			lat:12.9667,
			lon:77.5667
		};

		hotels =[
			{lat:13.442781448364258,lon:74.73983001708984},{lat:11.651593208312988,lon:78.16067504882812},{lat:14.796710968017578,lon:74.15335083007812}
			];

		console.log(calculateLatlongDistances(chennai,hotels));
/*
		//console.log(caluculate_latlong_distance(12.9667,77.5667,13.0827,80.2707));

*/