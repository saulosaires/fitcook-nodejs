
exports.login = function(req,res) {
	
	  var name 	 = req.param("name");
	  var photo  = req.param("photo");
	  var email  = req.param("email");
	  var deviceName  = req.param("deviceName");
      var deviceId  = req.param("deviceId");	   

	  
	  if(typeof name == 'undefined'){
		res.write('{status:error,msg:name_required}');res.end();
	  }
	 
 	  if(typeof email == 'undefined'){
		res.write('{status:error,msg:email_required}');res.end();
	  }
	  
	  if(typeof deviceId == 'undefined'){
		res.write('{status:error,msg:deviceId_required}');res.end();
	  }
	  
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	  
	    var collection = db.collection('user');
	 
		if(err) throw err;

		collection.find( {'deviceId':deviceId} ).limit(1).toArray(function(err, docs) {
		
			if(err) throw err;
			
			if (docs.length > 0){
				exports.update_profile(req,res);
			 }else{
				exports.register_profile(req,res);
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

			 res.write('{status:success,msg:profile_updated}');res.end();
			 db.close();
			 
		})
		   
		 
		 
	})  
   
}		



exports.default_group = function() {

	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		  if(err) throw err;

		  var collection = db.collection('group');
		  var label = "My group";
		  var id= uuid.v1();
		  
		  collection.insert([{'label' :label, 
							  'uuid':id
							}], function(err, result) {
							
			if (err) throw err;

			return id;
			db.close();
		  });

	  })
   
}