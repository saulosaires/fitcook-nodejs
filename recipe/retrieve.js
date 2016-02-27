
exports.retrieve = function(req,res) {
	
    var name = req.param("name");
	
    if(typeof name == 'undefined'){
	 
	}

	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('recipes');
	  
		collection.find({ "ativo": "true"} ).toArray(function(err, docs) {
			
			if(err) throw err;
			 
		 
		 res.send(docs);
			res.end();
			db.close();
			
		})
	})
}

exports.retrieveById = function(req,res) {
	
	var id  = req.param("id");
     
    if(typeof id == 'undefined'){
	 res.write('{status:error,msg:[id_required]}');res.end();
	}

    if( id === null || id === "null" || id.length != 24 ){
	 res.write('{status:error,msg:[id_invalid]}');res.end();
	}
	
  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('recipes');
	  
		collection.find( {_id:require('mongodb').ObjectID(id)} ).toArray(function(err, docs) {
			
			if(err) throw err;
			console.log(docs);
			res.send(docs);
			res.end();
			db.close();
			
		})
	})
 
}

exports.retrieveApp = function(req,res) {
	
	var time  = req.param("time");
     
 
    if(typeof time == 'undefined'){
		exports.retrieve(req,res);
	}else{
		exports.retrieveByTime(req,res);
	}
  
 
}	

exports.retrieveByTime = function(req,res) {
	
	var time  = Number(req.param("time"));
 
	
  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('recipes');
	  
		collection.find( {'time': {$gte:time}} ).toArray(function(err, docs) {
			
			if(err) throw err;
			
			var jsonData = {};
			    jsonData["status"] = "success";
			    jsonData["array"] = docs;
			    jsonData["time"] = new Date().getTime();
			
			res.send(JSON.stringify(jsonData));
			res.end();
			db.close();
			
		})
	})
 
}

exports.retrieveSite = function(req,res) {
 
 	var name      = req.param("name");
 
	if(typeof name != 'undefined'){

		exports.retrieveByName(req,res);
		 
	} else{
	    
		exports.retrieveByAll(req,res);
	}
 
 
}

exports.retrieveByName = function(req,res) {

	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	
	   var name      = req.param("name");
	   
	var collection = db.collection('recipes');
	  
	  var str1 = "/.*";
 
var str3 = " .*/";
var res = str1.concat(name,str3);
	  
	  
		collection.find($and:[{"recipe.name":{ $regex:res}},{ "ativo": "true"}]).toArray(function(err, docs) {
			
			if(err) throw err;
			
			var jsonData = {};
			    jsonData["status"] = "success";
			    jsonData["array"] = docs;
			    
			
			
			res.send(JSON.stringify(jsonData));
			res.end();
			db.close();
			
		})
	})


}

exports.retrieveByAll = function(req,res) {

	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('recipes');
	  
		collection.find({ "ativo": "true"}).toArray(function(err, docs) {
			
			if(err) throw err;
			
			var jsonData = {};
			    jsonData["status"] = "success";
			    jsonData["array"] = docs;
			    
			
			
			res.send(JSON.stringify(jsonData));
			res.end();
			db.close();
			
		})
	})

}