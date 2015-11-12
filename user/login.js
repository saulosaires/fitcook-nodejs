
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
				
				var token = jwt.sign(user, app.get('superSecret'), {
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


exports.register_profile = function(req,res) {
	
	var name 	 = req.param("name");
	var photo  = req.param("photo");
	var email  = req.param("email");
	var deviceName  = req.param("deviceName");
    var deviceId  = req.param("deviceId");
	    
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
		 
	    var collection = db.collection('user');
		
		
		
		collection.insert([{'name' :name, 
							'photo':photo,
							'email':email,
							'deviceName':deviceName,
							'deviceId':deviceId
						 }], function(err, result) {
							
			if(err) throw err;

			 res.write('{status:success,msg:profile_registered}');res.end();
			 db.close();
			 
		})
		   
		 
		 
	})  
   
}	  

exports.update_profile = function(req,res) {
	
	var name 	    = req.param("name");
	var photo       = req.param("photo");
	var email       = req.param("email");
	var deviceName  = req.param("deviceName");
    var deviceId    = req.param("deviceId");
	    
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
		 
	    var collection = db.collection('user');
		 
		collection.update({'email':email,'deviceId':deviceId} ,
						   {
						     'name' :name, 
							 'photo':photo,
							 'email':email,
							 'deviceName':deviceName,
							 'deviceId':deviceId
						   }, function(err, result) {
							
			if(err) throw err;

			 if(result>0){
				res.write('{status:success,msg:profile_updated}');res.end();
			 }else{
				res.write('{status:fail,msg:none_updated}');res.end();
			 }
			 db.close();
			 
		})
		   
		 
		 
	})  
   
}		

