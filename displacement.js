/* 
	input = lat long of city 1 and city 2
	output = latlong distance between city 1 and city 2

 	source = http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points

 	Using harvensine formula
 	https://en.wikipedia.org/wiki/Haversine_formula
 */

var Displacement = {};

//function to caluculate displacement between two places
Displacement.calculateDisplacement = function (origin, destination){
	var radiusOfEarth = 6371; 									// Radius of the earth in km
  	var dLat = this.deg2rad(destination.lat - origin.lat);  	// deg2rad below
  	var dLon = this.deg2rad(destination.lon - origin.lon); 
  	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(origin.lat)) * Math.cos(this.deg2rad(destination.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  	var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt( 1 - a )); 
  	var latlonDistance = radiusOfEarth  * c; 					// Distance in km
  	return latlonDistance;
};

// function to change degrees to randians
Displacement.deg2rad = function(deg){           
	return deg * (Math.PI / 180);
};

//function to caluculate displacements for each city and push in the destination vector
Displacement.calculateDisplacements = function(originCity, destinations, done){
	var displacements = [];
	//looping through each city an getting the city displacement
	for(i = 0;i < destinations.length;i++){
		displacements[i] = this.calculateDisplacement(originCity, destinations[i]);
	}

	done(null, displacements);
	return displacements;
};

module.exports = Displacement;