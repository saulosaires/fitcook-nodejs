 
exports.create = function(req,res) {
	
    var episode = req.param("ep");
 
	
    if(typeof episode == 'undefined' || episode === null || episode === "null" ){
	  res.write('{status:error,msg:recipe_invalid}');res.end();return;
    }
 
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('dbs');
		
			
		collection.insert([{'ativo':'true',
							'episode':JSON.parse(episode),
							'time':new Date().getTime()
				 }], function(err, result) {
							
			if(err) throw err;

			var result={"status":"success","msg":"episode_created"}
			var json=JSON.stringify(result);
			
			 res.write(json);res.end();
			 db.close();
			
			 
		})
		 

	}) 	  

}
 