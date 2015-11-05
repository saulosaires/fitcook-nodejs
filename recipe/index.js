
var recipe_create   = require('./create');
var recipe_update   = require('./update'); 
var recipe_retrieve = require('./retrieve'); 
var recipe_delete   = require('./delete');  
 
exports.create = function(req,res) {
	return recipe_create.create(req,res);
}
exports.update = function(req,res) {
	return recipe_update.update(req,res);
} 
 exports.retrieve = function(req,res) {
	return recipe_retrieve.retrieve(req,res);
}
 exports.retrieveById = function(req,res) {
	return recipe_retrieve.retrieveById(req,res);
}
 exports.retrieveApp = function(req,res) {
	return recipe_retrieve.retrieveApp(req,res);
}
 exports.deleteRecipe = function(req,res) {
	return recipe_delete.deleteRecipe(req,res);
}
 