var uuid = require('node-uuid');

exports.create = function(req,res) {
	
	  var user_1 = req.param("user_1");
	  var user_2 = req.param("user_2");
	    
	  if(typeof user_1 == 'undefined' || user_1 === null || user_1 === "null" ){
		res.write('{status:error,msg:user_1_invalid}');res.end();return;
	  }
 
	  if(exports.query_profile(user_1)==0){
	    res.write('{status:error,msg:user_1_not_exist}');res.end();return;
	  }
	  
	  
	  
	  if(typeof user_2 == 'undefined' || user_2 === null || user_2 === "null" ){
		res.write('{status:error,msg:user_2_invalid}');res.end();return;
	  }

	  if(exports.query_profile(user_2)==0){
	    res.write('{status:error,msg:user_2_not_exist}');res.end();return;
	  }

	  if( user_1 == user_2 ){
		res.write('{status:error,msg:user_1_and_user_2_eq}');res.end();return;
	  }

	  
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('relationship');
		  
		  		collection.insert([{'user':[user_1,user_2],
							        'status':'A'
						 }], function(err, result) {
							
			if(err) throw err;

			 res.write('{status:success,msg:relationship_registered}');res.end();
			 db.close();
			 
		})
	 

	  })
 
 
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
   
