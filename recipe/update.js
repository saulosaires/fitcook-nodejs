 
exports.update = function(req,res) {
	
    var recipe = req.param("recipe");
 	var id  = req.param("id");
	
    if(typeof recipe == 'undefined' || recipe === null || recipe === "null" ){
	  res.write('{status:error,msg:recipe_invalid}');res.end();return;
    }
	 
    if(typeof id == 'undefined'){
	 res.write('{status:error,msg:[id_required]}');res.end();
	}

    if( id === null || id === "null" || id.length != 24 ){
	 res.write('{status:error,msg:[id_invalid]}');res.end();
	}
	
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		if(err) throw err;

		var collection = db.collection('recipes');
		  
 
		collection.update({'id':id},
							[{'recipe':recipe,'time':new Date().getTime()
				 }], function(err, result) {
							
			if(err) throw err;

			var result={"status":"success","msg":"recipe_created"}
			var json=JSON.stringify(result);
			
			 res.write(json);res.end();
			 db.close();
			
			 
		})
		 

	}) 	  

}
 