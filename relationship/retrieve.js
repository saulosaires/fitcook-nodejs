exports.retrieve = function(req,res) {
	
	var email = req.param("email");
	    
	if(typeof email == 'undefined' || email === null || email === "null" ){
		res.write('{status:error,msg:email_invalid}');res.end();return;
	}
 
	if(exports.query_profile(email)==0){
	    res.write('{status:error,msg:email_not_exist}');res.end();return;
	}
	  
res.send(email);res.end();

 
}


exports.query_profile = function(email) {
 
	
	
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
		 
	    var collection = db.collection('user');
		
		collection.find( {'email':email} ).limit(1).toArray(function(err, docs) {
		
			if(err) throw err;
			
			return docs.length;
			 

			db.close();
		
		})
		   
		 
		 
	})  
   
}
   
