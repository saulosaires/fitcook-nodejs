
exports.deleteRecipe = function(req,res) {
	
	var id  = req.param("id");
     
    if(typeof id == 'undefined'){
	 res.write('{status:error,msg:[id_required]}');res.end();
	}
	
    if( id === null || id === "null" || id.length != 24 ){
	 res.write('{status:error,msg:[id_invalid]}');res.end();
	}
   
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
	 	  
		if(err) throw err;
	   
		var collection = db.collection('recipes');
	  
			collection.update({_id:require('mongodb').ObjectID(id)} ,
							{ $set:{
									'ativo':'false' ,
									'time':new Date().getTime()
									}
							}, 
							function(err, result) {
			
				var jsonData = {};
			
			if(err){
					
			    jsonData["status"] = "success";
			    jsonData["msg"] = err;
			 
			
			res.write(JSON.stringify(jsonData));res.end();
			}
			    jsonData["status"] = "success";
			    jsonData["msg"] = "sucess";
				jsonData["result"] = "result";
			res.send(JSON.stringify(jsonData));res.end();
			db.close();
			
		})
	})
 
}
	
