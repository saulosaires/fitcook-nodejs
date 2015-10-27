
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

	
