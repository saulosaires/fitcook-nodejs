'use strict';

// Requires meanio
var mean = require('meanio');
var url     = require('url');
var cors = require('cors');
var recipe=require('./recipe/index');

// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {

  console.log('Mean app started on port ' + config.http.port + ' (' + process.env.NODE_ENV + ')');
  if(config.https && config.https.port){
    console.log('Mean secure app started on port ' + config.https.port + ' (' + process.env.NODE_ENV + ')');
  }
  
  global.urlMongo='mongodb://admin:NlCv6mWKfga1@127.10.56.2:27017/mean';
 
  app.use(cors());
 
  
  app.get('/api/*', function (req,res,next) {
    
 
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
			case '/api/retrieveApp':
				recipe.retrieveApp(req,res);
			break; 	
			
			case '/api/deleteRecipe':
				recipe.deleteRecipe(req,res);
			break; 			
			
			default:
				res.write('default');
				res.end();
			break;				
			
		}	
	
  });
  
   
});
