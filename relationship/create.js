var uuid = require('node-uuid');

exports.create = function(req,res) {
	
	  var user_1 = req.param("user_1");
	  var user_2 = req.param("user_2");
	    
	  if(typeof user_1 == 'undefined' || user_1 === null || user_1 === "null" ){
		res.write('{status:error,msg:user_1_invalid}');res.end();
	  }

	  if(typeof user_2 == 'undefined' || user_2 === null || user_2 === "null" ){
		res.write('{status:error,msg:user_2_invalid}');res.end();
	  }
	  
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('relationship');
		  
		collection.find( {'user':[user_1,user_2],'status:A'} ).limit(1).toArray(function(err, docs) {
		
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

   