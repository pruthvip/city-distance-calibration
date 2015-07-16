var CorrectionFactor = {};

//function to calculate ratios of each element from 2 equal sized arrays
CorrectionFactor.calculateRatios = function(distances, displacements){
	var ratios = [];
	for(var index in distances){
		ratios.push(distances[index] / displacements[index]);
	}
	return ratios;
}

//function to find the average from a given array of values
CorrectionFactor.average = function(values){
	var sum = 0;
	for(var index in values){
		sum = sum + values[index];
	}
	return sum/values.length;
}

//function to calculate the Correction Factor
CorrectionFactor.calculateCF = function(distances, displacements, done){
	var ratios = this.calculateRatios(distances, displacements);	//calculate the individual distance to displacement ratio of hotels
console.log(ratios);
	var newCF = this.average(ratios);								//calculate the average ratio i.e. Correction Factor
console.log(newCF);
	DBHandler.putCF(newCF, function(err){							//persist the new Correction Factor to DB
		done(err);
	});													
	
	return newCF;
}

module.exports = CorrectionFactor;