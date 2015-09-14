var uuid = require('node-uuid');

exports.send = function(req,res) {
	
	  var user_1 = req.param("user_1");
	  var user_2 = req.param("user_2");
	    
	  if(typeof user_1 == 'undefined' || user_1 === null || user_1 === "null" ){
		res.write('{status:error,msg:user_1_invalid}');res.end();return;
	  }

	  if(typeof user_2 == 'undefined' || user_2 === null || user_2 === "null" ){
		res.write('{status:error,msg:user_2_invalid}');res.end();return;
	  }

	  if( user_1 == user_2 ){
		res.write('{status:error,msg:user_1_and_user_2_eq}');res.end();return;
	  }

		require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
			 
			if(err) throw err;
		 
			db.collection('user').find({'email':{$in: [user_1,user_2]}}).toArray(function(err, docs) {
			
				if(err) throw err;
				
				if(docs.length<2){
				   res.write('{status:success,msg:user_1_or_user_2_not_exist}');res.end();db.close();return;
				}else{
				  exports.exist_relationship(req,res);
				}	
			
			})
			   
		})  	  

}

exports.exist_relationship = function(req,res) {
  
  	var user_1 = req.param("user_1");
	var user_2 = req.param("user_2");
	  
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('relationship');
	
		collection.find({'users':{$elemMatch:{[{'email':user_1},{'email':user_2}]}} }).toArray(function(err, result) {
													
			if(err) throw err;

			if (result.length >0){
				res.write('{status:success,msg:user_1_and_user_2_already}');res.end();db.close();return;
			}else{
				exports.create_relationship(req,res);
			}
			 res.end();
			 db.close();
			 
		})
	 
	})
   
}

exports.create_relationship = function(req,res) {
 
 
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('relationship');
		  
		var id= uuid.v1();
		  
		collection.insert([{'users':[user_1,user_2],
							'status':'P',
							'uuid':id
				 }], function(err, result) {
							
			if(err) throw err;

			 res.write('{status:success,msg:relationship_registered}');res.end();
			 db.close();
			 
		})
	 

	  })
   
}
   
