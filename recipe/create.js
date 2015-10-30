 
exports.create = function(req,res) {
	
    var recipe = req.param("recipe");
 
	
    if(typeof recipe == 'undefined' || recipe === null || recipe === "null" ){
	  res.write('{status:error,msg:recipe_invalid}');res.end();return;
    }
 
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('recipes');
		  
 
		collection.insert([{'recipe':recipe,
							'time':new Date().getTime()
				 }], function(err, result) {
							
			if(err) throw err;

			 res.write('{"status":"success","msg":"recipe_created"}');res.end();
			 db.close();
			
			 
		})
		 

	}) 	  

}
 