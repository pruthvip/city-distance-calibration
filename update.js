var Update = {};
var DBHandler = require('./dbhandler');
var maxRadius = 30;

//required functiond!!!!
//getLatlongCity(cityName)
//findDisplacement(latlongCity, latlongHotel)
//findDistance(latlongCity, latlongHotel)
//calculateRatio(distance, displacement)
//getCF()
//putCF()


//function to update the Correction Factor of a city after adding a new Hotel
Update.updateCF = function(latlongHotel, cityName, done){
	//calculate the distance to displacement ratio of the new Hotel from the City latitude and longitude
	var newRatio = calculateRatio(findDistance(latlongHotel, getLatlongCity(cityName)), findDisplacement(latlongHotel, getLatlongCity(cityName)));
	var oldRatio = DBHandler.getCF(cityName); 									//Fetch the old Correction Factor
	var totalHotels = getTotalHotels(cityName); 								//Fetch the number of existing hotels in the given city

	var newCF = (((oldRatio * totalHotels) + newRatio) / (totalHotels + 1)); 	//new Correction Factor

	DBHandler.putCF(newCF, function(err){
		done(err);
	});																			//persist new Correction Factor to DB
	return newCF;
}

//function to update the Search Radius of a city after adding a new Hotel
Update.updateSR = function(latlongHotel, cityName, done){
	var oldRadius = DBHandler.getSR(cityName); 									//Fetch the old Correction Factor
	var newRadius = findDisplacement(latlongHotel, getLatlongCity(cityName)); 	//calculate the distance of the hotel form the city latitude and Longitude

	if(oldRadius >= newDistance){
		done(err);
		return oldRadius;
	}else if(oldRadius < newDistance && newDistance <= maxRadius){
		DBHandler.putSR(newRadius,function(err){								//persist the new Search Radius to DB
			done(err);
		});				
		return newRadius;
	}else{
		done(err);
		return oldRadius;
	}
}

module.exports = Update;