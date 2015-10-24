// toplevel html's JS - probably empty

Template.registerHelper('isTeacher', function() {
   return isTeacher(Meteor.user());
});

Template.registerHelper('isStudent', function() {
   return isStudent(Meteor.user());
}); 

Template.registerHelper('equals', function (a, b) {
   return a === b;
 });

isTeacher = function (user) {
   return user.profile.userType === 'teacher';
}

isStudent = function (user) {
   return user.profile.userType === 'student';
}
