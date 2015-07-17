var Update = {};
var SearchRadius = require('./setupSR');
var CorrectionFactor = require('./setupCF');
var Distance = require('./distance');
var Displacement = require('./displacement');
var DBHandler = require('./dbhandler');
var maxRadius = 30;

//required functions!!!!
//getLatlongCity(cityName)
//getCF()
//putCF()
//

//function to update the Correction Factor of a city after adding a new Hotel
Update.updateCF = function(cityName, latlongHotels, done){
	var _this = this;
	var latlongCity, distances, displacements;

	
	//get the longitude and latitude vaues of the city
	findLatLongCity(cityName, function(err, latlongCity){					
		//get displacements between hotels and the city coordinates
		Distance.calculateDistances(latlongCity, latlongHotels, function(err, distances){
			//get distances between hotels and the city coordinates	
			Displacement.calculateDisplacements(latlongCity, latlongHotels, function(err, displacements){
													
				var oldCF = DBHandler.getCF(cityName); 						//Fetch the old Correction Factor
				var totalHotels = DBHandler.getTotalHotels(cityName); 		//Fetch the number of existing hotels in the given city
				//calculate the distance to displacement ratio of the new Hotels from the City latitude and longitude
				var tempCF = CorrectionFactor.average(CorrectionFactor.calculateRatios(distances, displacements));
				//calculation of new correction factor
				var newCF = ((oldCF * totalHotels) + (tempCF * latlongHotels.length) / (totalHotels + latlongHotels.length)); 	

				DBHandler.putCF(newCF, function(err){						//persist new Correction Factor to DB
					done(err, newCF);
				});		
			});											
		});
	});
};

//function to update the Search Radius of a city after adding a new Hotel
Update.updateSR = function(latlongCity, latlongHotels, done){
	var oldSR = DBHandler.getSR(latlongCity); 								//Fetch the old Correction Factor
	var newSR, latlongCity, displacements; 									//calculate the distance of the hotel form the city latitude and Longitude

	//get displacements between hotels and the city coordinates
	Displacement.calculateDisplacements(latlongCity, latlongHotels, function(err, displacements){	
		console.log(displacements);	
		newSR = SearchRadius.maxValue(displacements);						//max
		console.log(newSR);
		if(oldSR < newSR && newSR <= maxRadius)
			DBHandler.putSR(newRadius,function(err){						//persist the new Search Radius to DB
				done(err, newSR);
			});				
		else
			done(err, oldSR);
	});
};

module.exports = Update;