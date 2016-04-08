 
 
 exports.retrieveBySeason = function(req,res) {
 
	var season  = req.param("season");
 
 
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;

	   
	var collection = db.collection('dbs');
	
	  
		collection.find({"episode.season":season}).toArray(function(err, docs) {
			
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

exports.retrieveByID = function(req,res) {
	
	var id  = req.param("id");
     
    if(typeof id == 'undefined'){
	 res.write('{status:error,msg:[id_required]}');res.end();
	}

    if( id === null || id === "null" || id.length != 24 ){
	 res.write('{status:error,msg:[id_invalid]}');res.end();
	}
	
  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('dbs');
	  
		collection.find( {_id:require('mongodb').ObjectID(id)} ).toArray(function(err, docs) {
			
			if(err) throw err;
			console.log(docs);
			res.send(docs);
			res.end();
			db.close();
			
		})
	})
 
}