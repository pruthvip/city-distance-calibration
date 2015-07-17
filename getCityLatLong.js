var midPoint = function(latLon1,latLon2,callback){
	//console.log(latLon1);
//console.log('origin5');
	var lat1 =  latLon1.lat;
	var lon1 =  latLon1.lng;


	var lat2 =  latLon2.lat;
	var lon2 =  latLon2.lng;

    dLon = deg2rad(lon2 - lon1);

    //convert to radians
    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);
    lon1 = deg2rad(lon1);

    var Bx = Math.cos(lat2) * Math.cos(dLon);
    var By = Math.cos(lat2) * Math.sin(dLon);
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
    var lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

    //print out in degrees
    var a = {lat:lat3,lon:lon3 };
    //console.log(a);
    callback(null,a);
    //console.log('origin6');
}


function deg2rad(deg) {           // changing degree to randian
  return deg * (Math.PI/180);



};





var calculateMiddleLatLong = function(cityBounds,callback)
{
	var coOrdinate ={};
	//console.log('origin3');
	midPoint(cityBounds.northeast,cityBounds.southwest,callback);
	//console.log('origin4');
}



var query_finished = function (error,response,body,callback)
{
	var jsonObject = JSON.parse(body);
	//console.log('origin1');
	var s;
	calculateMiddleLatLong(jsonObject.results[0].geometry.viewport,function(err,a){//console.log(a);
		s=a;
		callback(null,a);
	});
	//console.log('origin2');
	//return callback(null,data);
}


var getCityLatLong = function(cityname,callback)
{
	var request= require('request');  
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ cityname;
   // console.log('origin');

    request.get(url, function(err,response,body){
    	query_finished(err,response,body,callback);
    }); 
        
}

getCityLatLong('chennai',function(err,data){
	console.log("finish");
	console.log(data);
});





