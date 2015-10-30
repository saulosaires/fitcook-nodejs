 
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

			var result={"status":"success","msg":"recipe_created"}
			var json=JSON.stringify(result);
			
			 res.write(json);res.end();
			 db.close();
			
			 
		})
		 

	}) 	  

}
 