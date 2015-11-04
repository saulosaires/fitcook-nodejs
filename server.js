'use strict';

// Requires meanio
var mean = require('meanio');
var url     = require('url');

var recipe=require('./recipe/index');


// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {

  console.log('Mean app started on port ' + config.http.port + ' (' + process.env.NODE_ENV + ')');
  if(config.https && config.https.port){
    console.log('Mean secure app started on port ' + config.https.port + ' (' + process.env.NODE_ENV + ')');
  }
  
  global.urlMongo='mongodb://admin:NlCv6mWKfga1@127.10.56.2:27017/mean';
  
 
  
  
  app.get('/api/*', function (req,res,next) {
    
	
	  // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://peaceful-sierra-3484.herokuapp.com');
	res.setHeader('Access-Control-Allow-Origin', 'https://peaceful-sierra-3484.herokuapp.com');
	res.setHeader('Access-Control-Allow-Origin', 'peaceful-sierra-3484.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	
 var pathname = url.parse(req.url).pathname;
		 
		switch(pathname){
		
			case '/api/':
				res.write('nada por enquanto');
				res.end();
			break;				
			
			case '/api/recipeCreate':
				recipe.create(req,res);
			break;	
			
			case '/api/recipeUpdate':
				recipe.update(req,res);
			break;	
			
			case '/api/recipeRetrieve':
				recipe.retrieve(req,res);
			break; 			 

			case '/api/retrieveById':
				recipe.retrieveById(req,res);
			break; 			
			
			default:
				res.write('default');
				res.end();
			break;				
			
		}	
	
	
  });
  
   
});
