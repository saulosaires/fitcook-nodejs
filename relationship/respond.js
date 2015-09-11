var uuid = require('node-uuid');

exports.respond = function(req,res) {
	
	  var uuid = req.param("uuid");
	  var respond = req.param("respond");
	    
	  if(typeof uuid == 'undefined' || uuid == null || uuid == "null" ){
		res.write('{status:error,msg:uuid_invalid}');res.end();return;
	  }
 
	  if(typeof respond == 'undefined' || respond == null || respond == "null" || 
	            respond!='y'           || respond!='n'    || respond!='Y'      || respond!='N'){
		res.write('{status:error,msg:respond_invalid}');res.end();return;
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
   
