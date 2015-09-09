var uuid = require('node-uuid');

exports.create = function(req,res) {
	
	  var label 	 = req.param("label");
	    
	  if(typeof label == 'undefined' || label === null || label === "null" ){
		res.write('{status:error,msg:label_required}');res.end();
	  }

	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		  if(err) throw err;

		  var collection = db.collection('group');
		  
		  var id= uuid.v1();
		  
		  collection.insert([{'label' :label, 
							  'uuid':id
							}], function(err, result) {
							
			if (err) throw err;

			res.write('{status:success,uuid:'+id+',label:'+label+'}');
			res.end();
			db.close();
		  });

	  })
 
}

   
