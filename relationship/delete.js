

exports.relation_del = function(req,res) {
 
    var uuid = req.param("uuid");
  
	if(typeof uuid == 'undefined' || uuid == null || uuid == "null" ){
	 res.write('{status:error,msg:uuid_invalid}');res.end();return;
    }
 
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
		 
	    var collection = db.collection('relationship');
		 
		collection.remove({'uuid':uuid}, function(err, result) {
							
			if(err) throw err;

			 if(result>0){
				res.write('{status:success,msg:relationship_removed}');res.end();
			 }else{
				res.write('{status:fail,msg:none_removed}');res.end();
			 }
			 db.close();
			 
		})
		   
    })
	
}
