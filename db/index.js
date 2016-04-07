
var db_create   = require('./create');
var db_update   = require('./update'); 
var db_retrieve = require('./retrieve'); 
var db_delete   = require('./delete');  
 
exports.create = function(req,res) {
	return db_create.create(req,res);
}
exports.update = function(req,res) {
	return db_update.update(req,res);
} 
 exports.retrieveBySeason = function(req,res) {
	return db_retrieve.retrieveBySeason(req,res);
}
 
 exports.deletedb = function(req,res) {
	return db_delete.deletedb(req,res);
}
 