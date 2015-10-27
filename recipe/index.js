
var recipe_create   = require('./create');
var recipe_retrieve = require('./retrieve'); 
 
exports.create = function(req,res) {
	return recipe_create.create(req,res);
}
 
 exports.retrieve = function(req,res) {
	return recipe_retrieve.retrieve(req,res);
}
 