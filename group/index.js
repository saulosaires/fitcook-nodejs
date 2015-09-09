
var group_create    = require('./create');
var group_retrieve  = require('./retrieve');
 
exports.create = function(req,res) {
	return group_create.create(req,res);
}
exports.retrieve = function(req,res) {
	return group_retrieve.retrieve(req,res);
}
 
