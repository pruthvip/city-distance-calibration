var http = require('http');
var url = require('url');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var FILE = './data/stayzilla_hotels.json';

var loadFile = function(file,callback){
  var fs= require('fs');
  fs.readFile(file,'utf-8',callback);
};

var addToElasticSearch = function(obj,index,callback){
  var value = obj[index];
  client.create({
    index: value['_index'],
    type: value['_type'],
    id: value['_id'],
    body: value['_source']
  }, function (error, response) {
    if(index<obj.length-1)
      addToElasticSearch(obj,index+1,callback);
    else {
      callback(null);
    }
  });
};


loadFile(FILE,function(err,data){
  var obj= null;
  if(err)
    console.log(err);
  obj = JSON.parse(data);
  var index = 0;
  addToElasticSearch(obj,index,function(err){
    console.log(err);
  });
});
