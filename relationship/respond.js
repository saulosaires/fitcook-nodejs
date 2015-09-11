var uuid = require('node-uuid');

exports.respond = function(req,res) {
	
	  var uuid = req.param("uuid");
	  var respond = req.param("respond");
	    
	  if(typeof uuid == 'undefined' || uuid == null || uuid == "null" ){
		res.write('{status:error,msg:uuid_invalid}');res.end();return;
	  }
 
	  if(typeof respond == 'undefined' || respond == null || respond == "null" || 
	            respond!='y'           || respond!='n'    || respond!='Y'      || respond!='N'){
		res.write('{status:error,msg:respond_invalid}');res.end();return;
	  }

	 res.write('wqqwe');res.end();return;
	 
 
 
 
}

 
   
