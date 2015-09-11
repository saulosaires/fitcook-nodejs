
var relation_send    = require('./send');
var relation_respond  = require('./respond');
 
exports.send = function(req,res) {
	return relation_send.send(req,res);
}
exports.respond = function(req,res) {
	return relation_respond.respond(req,res);
}
 
