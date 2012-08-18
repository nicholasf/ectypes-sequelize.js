var lingo = require('lingo');
var strategy = {};

exports.setup = function(sequelize){
	strategy.sequelize = sequelize;
	return this;
};

exports.build = function(model, values){ 
	var dao = getDAO(model);
	var modelInstance = dao.build(values);
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
