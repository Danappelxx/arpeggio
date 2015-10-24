// // meteor publish definitions
// Meteor.publish('course', function () {
// 	return Course.find();
// });

// UNSAFE! (who cares)
Meteor.publish('users', function() {
    return Meteor.users.find({}, {fields:{profile: true, courses: true} });
}); 

Meteor.users.allow({
    'insert': function () {
        return true; 
    },
    'update': function () {
        return true;
    }
});