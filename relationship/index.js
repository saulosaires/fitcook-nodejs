
var relation_send     = require('./send');
var relation_respond  = require('./respond');
var relation_block    = require('./block'); 
var relation_delete   = require('./delete'); 
 
exports.send = function(req,res) {
	return relation_send.send(req,res);
}
exports.respond = function(req,res) {
	return relation_respond.respond(req,res);
}
exports.block = function(req,res) {
	return relation_block.block(req,res);
} 
exports.unblock = function(req,res) {
	return relation_block.unblock(req,res);
} 
exports.del = function(req,res) {
	return relation_delete.del(req,res);
} 
