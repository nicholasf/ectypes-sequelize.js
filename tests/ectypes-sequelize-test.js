var ectypes = require('ectypes')
	, Sequelize = require('sequelize')
	, should = require('should')
	, Faker = require('faker');


//obviously change this to work with your mysql db if you want to run this test
var sequelize = new Sequelize('ectypes_test', 'root', null);

var projectPlan = {
	Project: {
		title: function(){ return Faker.Name.findName() }
	}
};

var requestPlan = {
	SimpleReqest: {
 		title: function(){ return Faker.Name.findName() }
	}
};

var ectypesSequelize = require('./../lib/ectypes-sequelize').setup(sequelize);

var Project = sequelize.define('projects', {
 	title: Sequelize.STRING,
  description: Sequelize.TEXT
});
 
//a var and table name with more complex pluralization and underscoring requirements
var SimpleRequest = sequelize.define('simple_requests', {
	title: Sequelize.STRING,
});

sequelize.sync();

ectypes.load(ectypesSequelize);

describe('the sequelize strategy', function(){
	it('constructs the planned foo', function(){
		ectypes.add(projectPlan);
		var project = ectypes.Project.build();
		console.log(project.title);
		should.exist(project.title);
	});

	// it('constructs the planned foo (with two names for pluralization and underscoring)', function(){
	// 	ectypes.add(requestPlan);
	// 	var request = ectypes.SimpleRequest.build();
	// 	should.exist(request.title);
	// });

	// it('throws an error if it cannot locate the corresponding sequelize dao', function(){
	// 	ectypes.add({Fail:{}});

	// 	try{
	// 		ectypes.Fail.build();
	// 	}
	// 	catch(err){
	// 		should.exist(err);
	// 	}
	// })
});