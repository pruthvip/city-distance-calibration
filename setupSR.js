var SearchRadius = {};
var maxRadius = 30;
var DBHandler = require('./dbhandler');

//Function to find the maximum value from an array
SearchRadius.maxValue = function(values){
	var max = values[0];
	for(var index in values){
		if(max < values[index] && values[index] <= maxRadius)
			max = values[index];
	}
	return max;
};

//function to calculate Search Radius
SearchRadius.calculateSR = function(displacements, done){
	newSR = this.maxValue(displacements); 	//get the maximum displacement of hotels
	DBHandler.putSR(newSR, function(err){	//persist the new Search RAdius to DB
		done(null, newSR);
	});							

	return newSR;
};

module.exports = SearchRadius;