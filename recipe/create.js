 
exports.create = function(req,res) {
	
    var recipe = req.param("recipe");
 
	
    if(typeof recipe == 'undefined' || recipe === null || recipe === "null" ){
	  res.write('{status:error,msg:recipe_invalid}');res.end();return;
    }
 
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('recipes');
		    
		var jsonData = {};
			jsonData["ativo"] = "true";
			jsonData["recipe"] = recipe;
			jsonData["time"] = new Date().getTime();
		
		var json = JSON.stringify(jsonData);
			
		collection.insert([json], function(err, result) {
							
			if(err) throw err;

			var result={"status":"success","msg":"recipe_created"}
			var json=JSON.stringify(result);
			
			 res.write(json);res.end();
			 db.close();
			
			 
		})
		 

	}) 	  

}
 