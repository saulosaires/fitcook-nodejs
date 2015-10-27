
exports.retrieve = function(req,res) {
	
    var name = req.param("name");
	
    if(typeof name == 'undefined'){
	 
	}

  
  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('recipes');
	  
		collection.find(  ).toArray(function(err, docs) {
			
			if(err) throw err;
			 
		 
		 res.send(docs);
			res.end();
			db.close();
			
		})
	})
}

	
