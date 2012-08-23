[![build status](https://secure.travis-ci.org/nicholasf/ectypes-sequelize.js.png)](http://travis-ci.org/nicholasf/ectypes-sequelize.js)
# ectypes-sequelize

A ectypes strategy for Sequelize.js - http://www.sequelizejs.com/. 

Ectypes can be found at http://github.com/nicholasf/ectypes.js


## Installation

```
npm install ectypes-sequelize
```

## Explanation

Calls to build() and create() on a Sequelize model are supported.

First, create the Sequelize connection and configure it on the ectypes-sequelize strategy. Then load the strategy into ectypes.

```
var ectypes = require('ectypes');
var sequelize = new Sequelize('ectypes_test', 'nicholas', null);
var ectypesSequelize = require('ectypes-sequelize').setup(sequelize);

ectypes.load(ectypesSequelize);
```


Once you have defined an ectype for your model:

```
//the Sequelize model definition
var Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});

//the ectype for the Project model
var projectType = {
	Project: {
		title: function(){ return Faker.Name.findName() }
	}
};

ectypes.add(projectType);
```

You may then call build() or create() upon it through ectypes to produce the object.

```
ectypes.Project.create().success(function(project){
	console.log(project.id, project.title);  //this logs something like 6 'Autumn Medhurst' (using Faker)
});

```

Use hooks to model associations.

```
	ectypes.plan(
		{
			Project: {
				title: function(){ return Faker.Name.findName() },
				description: function(){ return Faker.Lorem.findSentences() },
				_hooks: [ 'add a task to a project', function(project, functionName){
					if (functionName === 'create'){				
						Task.create().success(function(task){
							project.task = task;
							project.save();
						});
					}
				}]
			}
		});

	project = ectypes.Project.build();

```

## Running Tests

```
mocha --ignore-leaks tests/ectypes-sequelize-test.js 
```

## Credits

This library was made while working at Moneytribe - http://moneytribe.com.au.
 	