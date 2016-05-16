
exports.insert = function(req,res) {
	
	  var name 	 = req.param("name");
	  var number = req.param("number");
	  var json 	 = req.param("json");
 	
	  if(typeof json == 'undefined'){
		res.write('{status:error,msg:json_required}');res.end();
		return;
	  }


	  
	  require('mongodb').MongoClient.connect(global.urlMongo, function(err, db) {

		  if(err) throw err;

		  var collection = db.collection('contatos');
		  
		  collection.insert([{
							  'name'   :name,
							  'number' :number,		
							  'contact':json
							}], function(err, result) {
							
			if (err) throw err;

			res.write('{status:success,msg:[sucess],result:'+result.toString()+'}');
			res.end();
			db.close();
		  });

	  })
}
	
