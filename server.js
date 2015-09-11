'use strict';

// Requires meanio
var mean = require('meanio');
var url     = require('url');

var user=require('./user/index');
var relationship=require('./relationship/index');


// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {

  console.log('Mean app started on port ' + config.http.port + ' (' + process.env.NODE_ENV + ')');
  if(config.https && config.https.port){
    console.log('Mean secure app started on port ' + config.https.port + ' (' + process.env.NODE_ENV + ')');
  }
  
  global.urlMongo='mongodb://admin:NlCv6mWKfga1@127.10.56.2:27017/mean';
  
  app.get('/api/*', function (req,res,next) {
    
 var pathname = url.parse(req.url).pathname;
		 
		switch(pathname){
		
			case '/api/':
				res.write('nada por enquanto');
				res.end();
			break;				

			case '/api/userLogin':
				user.login(req,res);
			break;	

			case '/api/userRetrieve':
				user.retrieve(req,res);
			break;	
			
			case '/api/relationshipSend':
				relationship.send(req,res);
			break;	
			
 			case '/api/relationshipRespond':
				relationship.respond(req,res);
			break;	
 
 			case '/api/relationshipBlock':
				relationship.block(req,res);
			break;	
 			case '/api/relationshipUnBlock':
				relationship.unblock(req,res);
			break;
			
 			case '/api/relationshipDelete':
				relationship.del(req,res);
			break;		

 			case '/api/relationshipRetrieve':
				relationship.retrieve(req,res);
			break;	
			
			default:
				res.write('default');
				res.end();
			break;				
			
		}	
	
	
  });
  
   
});
