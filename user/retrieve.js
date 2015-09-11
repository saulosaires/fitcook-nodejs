
exports.retrieveByEmail = function(req,res) {
	
    var deviceId = req.param("deviceId");
	
    if(typeof deviceId == 'undefined'){
	 res.write('{status:error,msg:[deviceId_required]}');res.end();
	}

    if( deviceId === null || deviceId === "null"  ){
	 res.write('{status:error,msg:[deviceId_invalid]}');res.end();
	}	
  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('user');
	  
		collection.find( {'deviceId':deviceId} ).toArray(function(err, docs) {
			
			if(err) throw err;
			 
			console.log(docs);
			
			if (docs.length > 0){
			res.send(docs[0]);
			}else{
			res.send("{}");
			}
			
		 
			res.end();
			db.close();
			
		})
	})
}

	
