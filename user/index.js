
var user_login   = require('./login');
var user_retrieve= require('./retrieve'); 
 
exports.login = function(jwt,req,res) {
	return user_login.login(jwt,req,res);
}

  