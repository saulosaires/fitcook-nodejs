
var group_send    = require('./send');
var group_respond  = require('./respond');
 
exports.send = function(req,res) {
	return group_send.send(req,res);
}
exports.respond = function(req,res) {
	return group_retrieve.respond(req,res);
}
 
