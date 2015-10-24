// toplevel html's JS - probably empty

Template.registerHelper('isTeacher', function() {
   return Meteor.user().profile.userType === 'teacher';
});

Template.registerHelper('isStudent', function() {
   return Meteor.user().profile.userType === 'student';
}); 