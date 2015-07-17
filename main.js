var Fetch = require('./fetch')
var Update = require('./update');
var Distance = require('./distance')
var DBHandler = require('./dbhandler');
var SearchRadius = require('./setupSR');
var CorrectionFactor = require('./setupCF');
var Displacement = require('./displacement')

var dist = [2,3,4,5,6];
var disp = [1,2,3,4,5];

// chennai = {lat:12.9667, lon:77.5667};
// hotels = [{lat:13.442781448364258, lon:74.73983001708984}, {lat:11.651593208312988, lon:78.16067504882812}, {lat:14.796710968017578, lon:74.15335083007812}];

// Displacement.calculateDisplacements(chennai, hotels, function(err, displacements){
// 		console.log(displacements);
// });

// Distance.calculateDistances(chennai, hotels, function(err, distances){
// 		console.log(distances);
// });

// CorrectionFactor.calculateCF(dist, disp, function(err, correction){
// 		console.log('CF : ' + correction);
// });

// SearchRadius.calculateSR(disp, function(err, radius){
//  	console.log('SR : ' + radius);
// });

// Update.updateCF(cityName, latlongHotels, function(err, newCF){
// 		console.log('new CF : ' + newCF);
// });
// Update.updateSR(cityName, latlongHotels, function(err, newSR){
// 		console.log('new SR : ' + newSR);
// });

// Fetch.cities(null, function(err, cities){
// 	console.log(cities);
// });
