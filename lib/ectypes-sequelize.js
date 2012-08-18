var lingo = require('lingo');
var strategy = {};

strategy.setup = function(sequelize){
	strategy.sequelize = sequelize;
	return this;
};

exports.setup = strategy.setup;

exports.build = function(model, values){ 
	console.log(1,  " <<<<<<< ------------------------", values);
	throw Error("Could not locate Sequelize DAO for ");
	var dao = getDAO(model);
	console.log(2, "GOT IT>>>>>>>>");
	var modelInstance = dao.build(values);
	console.log(3);
	console.log(modelInstance.values, " << modelInstance");
	return modelInstance;
};

exports.create = function(model, values){
	var dao = getDAO(model);
	var modelInstance = dao.create(values);
	return modelInstance;
};

getDAO = function(model){
	var tableName = lingo.underscore(model);
	tableName = lingo.en.pluralize(tableName);
	tableName = tableName.toLowerCase();

	var dao = strategy.sequelize.daoFactoryManager.getDAO(tableName);

	if (!dao){
		throw Error("Could not locate Sequelize DAO for " + tableName);
	}
	return dao;
}

//this tells ectypes not to proxy functionality to these functions
exports.ignores = ['setup', 'ignores'];
