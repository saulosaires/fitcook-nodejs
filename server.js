'use strict';

// Requires meanio
var mean = require('meanio');
var url     = require('url');

var user=require('./user/index');
var group=require('./group/index');


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
			
			case '/api/groupCreate':
				group.create(req,res);
			break;	
			
			case '/api/groupRetrieve':
				group.retrieve(req,res);
			break;	
 
			
			default:
				res.write('default');
				res.end();
			break;				
			
		}	
	
	
  });
  
  
  
});
