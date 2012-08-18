


INFO

For now, see test/drafts-test.js to gain an understanding.

Future plans - hooks, to help build associations.


Sequelize DSL:

You've created a model called Project that looks like:

var Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});

You want to be able to auto generate Project models with cool development or test data!

First, you set up the sequelize strategy with drafts.

```
var draftsSequelize = require('drafts-sequelize');
drafts.load(draftsSequelize);
```

Then you draft your data. The only rule is that the name of your draft matches the name of the model you declared in sequelize.

```
	drafts.plan(
		{
			Project: {
				title: function(){ return Faker.Name.findName() },
				description: function(){ return Faker.Lorem.findSentences() };
 			}
 		});

	project = drafts.Project.build();

```


In the future I'll be adding hooks, which will look something like the below (hopefully a cleaner language):

```
	drafts.plan(
		{
			Project: {
				title: function(){ return Faker.Name.findName() },
				description: function(){ return Faker.Lorem.findSentences() };
				_hooks: {
					build: {
						function(project, cb) {
							Task.create({});
							project.tasks = task;
							project.save().success(cb(project));
					}
				}
 		});

	project = drafts.Project.build();

```
