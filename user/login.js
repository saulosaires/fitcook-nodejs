
exports.login = function(jwt,req,res) {
	
	  var email 	    = req.param("email");
	  var password  = req.param("password");
 
	  
	  if(typeof email == 'undefined'){
		res.write('{status:error,msg:email_required}');res.end();
	  }
	 
 	  if(typeof password == 'password'){
		res.write('{status:error,msg:password_required}');res.end();
	  }

	  
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	  
	    var collection = db.collection('user');
	 
		if(err) throw err;

		collection.find( {'email':email,'password':password} ).limit(1).toArray(function(err, docs) {
		
			if(err) throw err;
			
			if (docs.length > 0){
				exports.update_profile(req,res);
				
				var token = jwt.sign(user, global.secret, {
				  expiresInMinutes: 1440 // expires in 24 hours
				});
				
				var jsonData = {};
			    jsonData["status"] = "success";
			    jsonData["token"] = token;
				res.send(JSON.stringify(jsonData));
				res.end();				

				
			 }else{
			 
				var jsonData = {};
			    jsonData["status"] = "error";
			    jsonData["msg"] = "invalid_email_or_password";
				res.send(JSON.stringify(jsonData));
				res.end();
			 }

			db.close();
		
		})
 
	  })
 
}
