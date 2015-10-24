// meteor publish definitions
Meteor.publish('course', function () {
	return Course.find();
});
