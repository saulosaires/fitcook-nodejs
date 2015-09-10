
exports.retrieve = function(req,res) {
	
    var email = req.param("email");
	
    if(typeof email == 'undefined'){
	 res.write('{status:error,msg:[email_required]}');res.end();
	}

    if( email === null || email === "null"  ){
	 res.write('{status:error,msg:[email_invalid]}');res.end();
	}	
  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
	if(err) throw err;
	   
	var collection = db.collection('group');
	  
		collection.find( {'email':email} ).toArray(function(err, docs) {
			
			if(err) throw err;
			 
			console.log(docs);
			
			if (docs.length > 0){
				res.send(docs);
			}else{
				res.send("{}");
			}
			
			res.send(docs);
			res.end();
			db.close();
			
		})
	})
}

	
