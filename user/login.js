
exports.login = function(jwt,req,res) {
	
	  var email 	    = req.param("email");
	  var password  = req.param("password");
 
	  
	  if(typeof email == 'undefined'){
		res.write('{status:error,msg:email_required}');res.end();
	  }
	 
 	  if(typeof password == 'undefined'){
		res.write('{status:error,msg:password_required}');res.end();
	  }

	  
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	  
	    var collection = db.collection('user');
	 
		if(err) throw err;

		collection.find( {'email':email} ).limit(1).toArray(function(err, docs) {
		
			if(err) throw err;
			
	 			var jsonData = {};
			    jsonData["status"] = "error";
			    jsonData["msg"] = "ddddd";
				res.send(JSON.stringify(jsonData));
				res.end();

			db.close();
		
		})
 
	  })
 
}
