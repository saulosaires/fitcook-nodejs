
var user_login   = require('./login');
var user_retrieve= require('./retrieve'); 
 
exports.login = function(req,res) {
	return user_login.login(req,res);
}

  