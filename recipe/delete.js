
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
	  
		collection.deleteOne( {_id:require('mongodb').ObjectID(id)},function(err, results) {
			
			if(err){
				res.write('{status:error,msg:['+err+']}');res.end();
			}
			console.log(results);
			res.send('{status:success,msg:[sucess],result:'+results+'}');
			res.end();
			db.close();
			
		})
	})
 
}
	
