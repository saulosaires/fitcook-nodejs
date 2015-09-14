exports.retrieve = function(req,res) {

	var email = req.param("email");
	      
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('user');
	
		collection.find({'users':{email}}).toArray(function(err, result) {
													
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
