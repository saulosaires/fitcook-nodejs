
var recipe_create = require('./create');
 
 
exports.create = function(req,res) {
	return recipe_create.create(req,res);
}
 