 
 
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