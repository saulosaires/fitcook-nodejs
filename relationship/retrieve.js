exports.retrieve = function(req,res) {

	var email = req.param("email");
	      
	if(typeof email == 'undefined' || email === null || email === "null" ){
		res.write('{status:error,msg:email_invalid}');res.end();return;
	}	  
		  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
		 
		if(err) throw err;
 	 
		db.collection('user').find({'email':email}).toArray(function(err, docs) {
		
			if(err) throw err;
			
			if(docs.length==0){
			 res.write('{status:error,msg:email_not_exist}');res.end();return;
			}else{
			 relationship_retrieve(email);
			}
		 
			 
			db.close();
		
		})
		   
	})  		  
		  
}


 exports.relationship_retrieve=function(email) {
 	  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('relationship');
	
		collection.find({'users':{$elemMatch:{'email':email}} }).toArray(function(err, result) {
													
			if(err) throw err;

			if (result.length > 0){
				res.send(result);
			}else{
				res.send("{}");
			}
			 res.end();
			 db.close();
			 
		})
	 
	})
   
}
