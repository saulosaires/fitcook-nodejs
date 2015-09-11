var uuid = require('node-uuid');

exports.respond = function(req,res) {
	
  var uuid = req.param("uuid");
  var respond = req.param("respond");
	
  if(typeof uuid == 'undefined' || uuid == null || uuid == "null" ){
	res.write('{status:error,msg:uuid_invalid}');res.end();return;
  }

  if(typeof respond == 'undefined' || respond == null || respond == "null" ){
	res.write('{status:error,msg:respond_invalid}');res.end();return;
  }
  
  if(respond!='y' && respond!='n' && respond!='Y' && respond!='N'){
	res.write('{status:error,msg:respond_invalid_value}');res.end();return;
  }
  
  if(respond=='y' || respond=='Y'){
	 exports.relationship_update(req,res);
  }else{
     exports.relationship_delete(req,res)
  }
 
 
}

 
exports.relationship_update = function(req,res) {
 
  var uuid = req.param("uuid");
	    
	require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {
		 
	    var collection = db.collection('relationship');
		 
		collection.update({'uuid':uuid},
						   {
						    $set:{
							 'status':'A'
						    }
						   }, function(err, result) {
							
			if(err) throw err;

			 if(result>0){
				res.write('{status:success,msg:relationship_updated}');res.end();
			 }else{
				res.write('{status:fail,msg:none_updated}');res.end();
			 }
			 db.close();
			 
		})
		   
    })
}


exports.relationship_delete = function(req,res) {
 
  var uuid = req.param("uuid");
	    
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
