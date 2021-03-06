'use strict';

// Requires meanio
var mean   = require('meanio');
var url    = require('url');
var cors   = require('cors');
var recipe = require('./recipe/index');
var db 	   = require('./db/index');
var user   = require('./user/index');
var ct     = require('./contacts/index');


var jwt    = require('jsonwebtoken'); 

// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {

  console.log('Mean app started on port ' + config.http.port + ' (' + process.env.NODE_ENV + ')');
  if(config.https && config.https.port){
    console.log('Mean secure app started on port ' + config.https.port + ' (' + process.env.NODE_ENV + ')');
  }
  
  global.secret='ilovescotchyscotch';
  global.urlMongo='mongodb://admin:NlCv6mWKfga1@127.10.56.2:27017/mean';
 
  app.use(cors());

  app.get('/api/addcontact', function (req,res,next) {
	ct.insert(req,res);
  });
  
  app.get('/api/login', function (req,res,next) {
	user.login(jwt,req,res);
  });
  
  app.get('/api/retrieveApp', function (req,res,next) {
	recipe.retrieveApp(req,res);
  });  
  
  app.get('/api/retrieveSite', function (req,res,next) {
	recipe.retrieveSite(req,res);
  }); 
  
  app.get('/api/detailRecipe', function (req,res,next) {
	recipe.retrieveById(req,res);
  });
  
 // DB ******************************************************
   app.get('/api/dbcreate', function (req,res,next) {
	db.create(req,res);
  });  

   app.get('/api/dbupdate', function (req,res,next) {
	db.update(req,res);
  });
  
  app.get('/api/dbretrieve', function (req,res,next) {
	db.retrieveBySeason(req,res);
  }); 
  
    app.get('/api/dbretrieveID', function (req,res,next) {
	db.retrieveByID(req,res);
  }); 
  
  app.get('/api/dbdelete', function (req,res,next) {
	db.deletedb(req,res);
  }); 
 //***************************************
  
  
  
  // route middleware to verify a token
  app.use(function(req, res, next) {

	  // check header or url parameters or post parameters for token
	  var token = req.param("token");// req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

		// verifies secret and checks exp
		jwt.verify(token, global.secret, function(err, decoded) {      
		  if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token.' });    
		  } else {
			// if everything is good, save to request for use in other routes
			req.decoded = decoded;    
			next();
		  }
		});

	  } else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		});
		
	  }
  }); 
 
 
 
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
