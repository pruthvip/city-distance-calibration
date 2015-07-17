var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

Fetch = {};

Fetch.cities = function (url,callback){
  client.search({
    index: 'stayzilla',
    type : 'hotels',
    size : 40,
    body : {
    aggs : {
        "city" : {
            "terms" : {
              "field" : "hcity",
              "size" : 0
           },
        }
    }
    }
    }, function (error, response) {
      cities = [];
      response.aggregations.city.buckets.forEach(function(value,index){
        cities.push(value.key);
      });
      //console.log(cities);
      callback(null,cities);
    });
  };

  Fetch.hotels = function(url,city,callback){
    client.search({
      index: 'stayzilla',
      type : 'hotels',
      q: 'hcity:'+city,
      size : 10000,
    }, function (error, response) {
      var hotels = [];
      response.hits.hits.forEach(function(value,index){
        hotels.push(value['_source']['location']);
      });
      console.log(hotels);
      callback(null,hotels);
    });
  };

  Fetch.countHotels=function(url,city,callback){
    client.count({
      index: 'stayzilla',
      type:'hotels',
    }, function (error, response) {
      callback(error,response.count);
    });
  };

  module.exports = Fetch;